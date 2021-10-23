import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import { CreateSupplierInput, TCreateSupplierInput } from '../types';
import { UserTC, User, Enterprise, EnterpriseDocument } from '../models';

export const createSupplier = schemaComposer.createResolver<
  any,
  {
    data: TCreateSupplierInput;
  }
>({
  name: 'createSupplier',
  type: UserTC.getType(),
  description: 'create a new supplier',
  kind: 'mutation',
  args: { data: CreateSupplierInput },
  async resolve({ args, context }) {
    // SECURITY

    // ARGS
    const { username, firstName, lastName, dni, email, photo } =
      args.data.createUserInfo;

    const {
      name,
      rif,
      category, // CURRENTLY NOT USING, ONLY FOR MVP PURPOSES
    } = args.data.createEnterprise;

    // VALIDATORS

    const supplierExist = await User.findOne({ dni, role: 2 }).exec();
    const enterpriseExist = await Enterprise.findOne({ rif }).exec();

    if (supplierExist) {
      throw new ApolloError('Error: Supplier existente');
    }
    if (enterpriseExist) {
      throw new ApolloError('Error: Empresa existente');
    }

    // CREATING NEW SUPPLIER

    const newSupplier = async (enterprise: EnterpriseDocument) => {
      const supplier = await User.create({
        username,
        firstName,
        lastName,
        dni,
        email,
        photo,
        role: 2,
        status: 1,
        enterprise: enterprise._id,
      });
      enterprise.owner = supplier._id;
      console.log(supplier);
      await enterprise.save();

      return supplier;
    };

    // CREATING ENTERPRISE
    const newEnterprise = async () => {
      const enterprise = await Enterprise.create({
        name,
        rif,
        status: 1,
        category: 0, // ONLY FOR MVP PURPOSES
      });
      return newSupplier(enterprise);
    };

    return newEnterprise();
  },
});
