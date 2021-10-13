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
    phone: String,
    role: Int,
    status: Float,
    enterprise: MongoID,
  }
  input CreateEnterpriseInput {
    name: String!,
    owner: MongoID,
    rif: String!,
    status: Float,
    category: Float!,
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
        phone: string;
        enterprise: Types.ObjectId;
    },
    createEnterprise: {
        name: string;
        owner: Types.ObjectId;
        rif: string;
        status: number;
        category: number;
    }
};