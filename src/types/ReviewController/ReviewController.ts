import { Types } from 'mongoose';
import { UserDocument, ProductDocument, EnterpriseDocument } from '../../models';

export const CreateReviewInput =`
    input CreateReviewInput {
        createReviewInfoInput: CreateReviewInfoInput
    }

    input CreateReviewInfoInput {
        client: MongoID,
        product: MongoID,
        enterprise: MongoID,
        productComment: String,
        productRating: Float,
        enterpriseComment: String,
        enterpriseRating: Float
    }
`;

export type TCreateReviewInput = {
    createReviewInfoInput: {
        client: UserDocument;
        enterprise: EnterpriseDocument;
        product: ProductDocument;
        productComment: string;
        productRating: number;
        enterpriseComment: string;
        enterpriseRating: number;
    }
}