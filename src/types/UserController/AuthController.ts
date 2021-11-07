import { Types } from 'mongoose';

export const CreateUserInput = `
  input CreateUserInput {
    createUserInfo: CreateUserInfoInput!,
    createEnterprise: CreateEnterpriseInput
  }
  input CreateUserInfoInput {
    username: String!,
    firstName: String!,
    lastName: String!,
    dni: String,
    email: String!,
    image: String,
    phone: String,
    role: Int,
    status: Float,
    password: String!,
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
export type TCreateUserInput = {
  createUserInfo: {
    username: string;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    image: string;
    role: number;
    status: number;
    phone: string;
    password: string;
    enterprise: Types.ObjectId;
  };
  createEnterprise: {
    name: string;
    owner: Types.ObjectId;
    rif: string;
    status: number;
    category: number;
  };
};
