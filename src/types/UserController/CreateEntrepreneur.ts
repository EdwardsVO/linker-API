import { Types } from "mongoose";

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
        shoppingCart: MongoID
      }
`;

export type TCreateEntrepreneurInput =  {
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
        shoppingCart: Types.ObjectId;
    }
};