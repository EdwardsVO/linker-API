import { Types } from 'mongoose';

export const CreateEntrepreneurInput = `
    input CreateEntrepreneurInput {
        createEntrepreneurInfo: CreateEntrepreneurInfoInput
    }

    input CreateEntrepreneurInfoInput {
        username: String!,
        firstName: String!,
        lastName: String!,
        dni: String,
        email: String!,
        photo: String,
        phone: String,
        role: Float,
        status: Float,
      }
`;

export type TCreateEntrepreneurInput = {
  createEntrepreneurInfo: {
    username: string;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    photo: string;
    role: number;
    status: number;
    phone: string;
  };
};

// FALTA AGREGAR SUMMARY SHOP
