import { Types } from 'mongoose';
import { EnterpriseDocument } from '../../models';

export const CreateProductInput = `
    input CreateProductInput {
        createProductInfo: CreateProductInfoInput,
        createProductImages: [String]
    }

    input CreateProductInfoInput {
        name: String!,
        description: String!,
        serial: String!,
        category: Float!,
        price: Float!,
        productStatus: Float,
        enterprise: MongoID,
        quantity: Float!,
        units: Float!
    }
  
`;

export type TCreateProductInput = {
  createProductInfo: {
    name: string;
    description: string;
    serial: string;
    category: number;
    price: number;
    productStatus: number;
    enterprise: EnterpriseDocument;
    quantity: number;
    units: number;
  };
  createProductImages: Array<string>;
};
