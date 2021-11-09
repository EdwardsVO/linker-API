/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import browser from "browser-detect";
import { schemaComposer } from "graphql-compose";
import { v4 as uuid } from "uuid";
import { ApolloError } from "apollo-server";
import { sendResetPasswordEmail } from "../utils/email";
import { CreateUserInput, TCreateUserInput } from "../types";
import {
  UserTC,
  User,
  Favorites,
  Enterprise,
  EnterpriseDocument,
} from "../models";

type TSignInInput = {
  email: string;
  password: string;
};

const SignInInput = `
  input SignInInput {
    email: String!
    password: String!
  }
`;

//SIGN UP RESOLVER
export const signUp = schemaComposer.createResolver<
  any,
  {
    data: TCreateUserInput;
  }
>({
  name: "signUp",
  type: UserTC.getType(),
  description: "Sign Up for a new user in the db",
  kind: "mutation",
  args: { data: CreateUserInput },
  async resolve({ args, context }) {
    const { username, firstName, lastName, dni, email, image, password, role } =
      args.data.createUserInfo;

    const userFromDB = await User.findOne({ email });

    if (userFromDB) {
      throw new ApolloError("Este email ya existe");
    }

    if (role === 1) {
      const favorite = await Favorites.create({
        favorite: [],
      });
      console.log(favorite);

      // CREATING NEW ENTREPRENEUR
      const entrepreneur = await User.create({
        username,
        firstName,
        lastName,
        dni,
        email,
        image,
        password,
        role,
        status: 1,
      });
      entrepreneur.favorites = favorite;
      entrepreneur.save();
      console.log(entrepreneur);
      const token = jwt.sign(
        {
          id: entrepreneur._id,
          role: role,
          emission: new Date().toISOString(),
        },
        process.env.SECRET
      );

      context.res.cookie("token", token, {
        secure: true,
        sameSite: "None",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 24 hrs in ms
        domain:
          process.env.NODE_ENV === "development"
            ? "localhost"
            : "linker-sprint2.vercel.app",
      });

      return entrepreneur;
    }

    if (role === 2) {
      const { name, rif, category } = args.data.createEnterprise;

      // VALIDATORS
      if (await Enterprise.findOne({ rif }).exec()) {
        throw new ApolloError("Error: Empresa existente");
      }

      // CREATING NEW SUPPLIER

      const newSupplier = async (enterprise: EnterpriseDocument) => {
        const supplier = await User.create({
          username,
          firstName,
          lastName,
          dni,
          email,
          image,
          password,
          role,
          status: 1,
          enterprise: enterprise._id,
        });
        enterprise.owner = supplier._id;
        console.log(supplier);
        await enterprise.save();

        const token = jwt.sign(
          {
            id: supplier._id,
            role: supplier.role,
            emission: new Date().toISOString(),
          },
          process.env.SECRET
        );

        context.res.cookie("token", token, {
          secure: true,
          sameSite: "None",
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24, // 24 hrs in ms
          domain:
            process.env.NODE_ENV === "development"
              ? "localhost"
              : "linker-sprint2.vercel.app",
        });

        return supplier;
      };

      // CREATING ENTERPRISE
      const newEnterprise = async () => {
        const enterprise = await Enterprise.create({
          name,
          rif,
          status: 1,
          category,
          banner: "https://linker-files.sfo3.digitaloceanspaces.com/ent.jpg",
        });
        return newSupplier(enterprise);
      };

      return newEnterprise();
    }
  },
});

//SIGN-IN RESOLVER
export const signIn = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: "signIn",
  kind: "mutation",
  description: "Sign In an user to the app",
  type: UserTC.getType(),
  args: {
    data: SignInInput,
  },
  async resolve({ args, context }) {
    const user = await User.findOne({ email: args?.data?.email, active: true });
    if (!user) {
      throw new ApolloError(
        `No se ha encontrado a un usuario con correo ${args?.data?.email}`
      );
    }
    const compare = await bcrypt.compare(args?.data?.password, user.password);
    if (!compare) {
      throw new ApolloError(`La contraseña es incorrecta ${args?.data?.email}`);
    }
    const token = jwt.sign(
      JSON.stringify({
        id: user._id,
      }),
      process.env.SECRET
    );
    context.res.cookie("token", token, {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      domain:
        process.env.NODE_ENV === "development" ? "localhost" : "localhost", //! FIXME:
    });
    return user;
  },
});

const SignOutType = `
  type SignOutType {
    success: Boolean!
  }
`;

export const signOut = schemaComposer.createResolver({
  name: "SignOut",
  kind: "mutation",
  description: "Sign Out an user from the app",
  type: SignOutType,
  args: {},
  async resolve({ context }) {
    if (!(context?.req?.cookies?.token ?? false)) {
      return { success: false };
    }
    context.res.clearCookie("token", {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      domain:
        process.env.NODE_ENV === "development" ? "localhost" : "localhost", //! FIXME:
    });
    return { success: true };
  },
});

export const currentUser = schemaComposer.createResolver({
  name: "currentUser",
  kind: "query",
  description: "Return the user object based on the token",
  type: UserTC.getType(),
  args: {},
  async resolve({ context }) {
    const { token }: { token: string } = context.req.cookies;
    if (!token) {
      return null;
    }
    const payload = jwt.decode(token) as { id: string };
    const user = User.findOne({ _id: payload.id, active: true });
    if (!user) {
      throw new ApolloError("User inexistente");
    }
    return user;
  },
});

type TResetPasswordInput = {
  email: string;
};

const ResetPasswordInput = `
  input ResetPasswordInput {
    email: String!
  }
`;

const ResetPasswordInfo = `
  type ResetPasswordInfo {
    success: Boolean!
    err: String
  }
`;

export const resetPassword = schemaComposer.createResolver<
  any,
  {
    data: TResetPasswordInput;
  }
>({
  name: "resetPassword",
  type: ResetPasswordInfo,
  description: "Reset Password",
  kind: "mutation",
  args: {
    data: ResetPasswordInput,
  },
  async resolve({ args, context }) {
    try {
      const browserData = browser(context?.req?.headers?.["user-agent"]);
      const user = await User.findOne({ email: args?.data?.email });
      if (!user) {
        throw new ApolloError(
          `El usuario con correo ${args?.data?.email} no esta registrado`
        );
      }
      user.resetToken = uuid();
      user.resetTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in ms
      await Promise.all([
        user.save(),
        sendResetPasswordEmail({
          user,
          os: browserData,
          url: `${process.env.CLIENT_URL}/reset-password/${user?.resetToken}`,
        }),
      ]);
      return { success: true };
    } catch (err) {
      return { err: err.message, success: false };
    }
  },
});

type TChangePasswordInput = {
  token: string;
  password: string;
};

const ChangePasswordInput = `
  input ChangePasswordInput {
    token: String!
    password: String!
  }
`;

export const changePassword = schemaComposer.createResolver<
  any,
  {
    data: TChangePasswordInput;
  }
>({
  name: "changePassword",
  type: ResetPasswordInfo,
  description: "Change Password",
  kind: "mutation",
  args: {
    data: ChangePasswordInput,
  },
  async resolve({ args }) {
    try {
      const user = await User.findOne({
        resetToken: args?.data?.token,
        resetTokenExpiry: {
          $gt: Date.now(),
        },
      });
      if (!user) {
        throw new ApolloError(`El token ha expirado`);
      }
      user.password = args?.data?.password;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      return { success: true };
    } catch (err) {
      return { success: false, err: err.message };
    }
  },
});
