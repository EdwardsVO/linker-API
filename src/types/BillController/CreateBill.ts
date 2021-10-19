import { Types } from 'mongoose';
import { UserDocument } from '../../models';

export const CreateBillInput = `
    input CreateBillInput {
        createBillInfoInput: CreateBillInfoInput,
        addingProducts: [MongoID]
    }

    input CreateBillInfoInput {
        client: MongoID!,
        tax: Float,
        totalPrice: Float!,
        review: String
    }
`

export type  TCreateBillInput = {
    createBillInfoInput: {
        client: UserDocument;
        tax: number;
        totalPrice: number;
        review: string;
    },
    addingProducts: Array<Types.ObjectId>
}