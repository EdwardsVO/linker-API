import { Types } from 'mongoose';
import { EnterpriseDocument } from '../../models';

export const CreateProductInput = `
    input CreateProductInput {
        createProductInfo: CreateProductInfoInput,
        createProductImages: [CreateProductImagesInput]
    }

    input CreateProductInfoInput {
        name: String!,
        description: String!,
        serial: String!,
        category: Float!,
        price: Float!,
        enterprise: MongoID,
        quantity: Float!,
        units: Float!
    }
    input CreateProductImagesInput {
        url: String
    }
`;

export type TCreateProductInput = {
    createProductInfo: {
        name: string;
        description: string;
        serial: string;
        category: number;
        price: number;
        enterprise: EnterpriseDocument;
        quantity: number;
        units: number;
    },
    createProductImages: {
        url: string;
    }
}