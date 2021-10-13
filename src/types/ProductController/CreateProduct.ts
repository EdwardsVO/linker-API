import { Types } from 'mongoose';

export const CreateProductInput = `
    input CreateProductInput {
        createProductInfo: CreateProductInfoInput,
        createProductImages: [CreateProductImagesInput]
    }

    input CreateProductInfoInput {
        name: String!,
        description: String!,
        category: Number!,
        price: Number!,
        enterprise: MongoID
    }
    input CreateProductImagesInput {
        image: String
    }
`;

export type TCreateProductInput = {
    createProductInfo: {
        name: string;
        description: string;
        price: number;
        enterprise: Types.ObjectId;
    },
    createProductImages: {
        image: string;
    }
}