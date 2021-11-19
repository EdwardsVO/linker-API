import { Types } from 'mongoose';
import { UserDocument, ProductDocument, EnterpriseDocument } from '../../models';

export const CreateBillInput = `
    input CreateBillInput {
        createBillInfoInput: CreateBillInfoInput,
        addingProducts: [MongoID]
    }

    input CreateBillInfoInput {
        client: MongoID!,
        enterprise: MongoID!,
        enterpriseOwner: MongoID!
        tax: Float,
        totalPrice: Float!,
        review: String
    }
`;

export type TCreateBillInput = {
  createBillInfoInput: {
    client: UserDocument;
    enterprise: EnterpriseDocument;
    enterpriseOwner: UserDocument;
    tax: number;
    totalPrice: number;
    review: string;
  };
  addingProducts: Array<ProductDocument>;
};
