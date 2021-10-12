import { Types } from "mongoose";

export const CreateSupplierInput = `
  input CreateSupplierInput {
    createUserInfo: CreateUserInfoInput,
    createEnterprise: CreateEnterpriseInput
  }
  input CreateUserInfoInput {
    username: String!,
    firstName: String!,
    lastName: String!,
    dni: String,
    email: String!,
    photo: String,
    role: Int!,
    status: Float,
  }
  input CreateEnterpriseInput {
    name: String!,
    owner: MongoID,
    rif: String!,
    status: Number!,
    category: Number!,
  }
`;
export type TCreateSupplierInput =  {
    createUserInfo: {
        username: string;
        firstName: string;
        lastName: string;
        dni: string;
        email: string;
        photo: string;
        role: number;
        status: number;
    },
    createEnterprise: {
        name: string;
        owner: Types.ObjectId;
        rif: string;
        status: number;
        category: number;
    }
};