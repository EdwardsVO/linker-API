import { Schema, Document, Types, model} from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ProductDocument, ProductTC } from './Product';
import { UserDocument, UserTC } from './User'

export interface BillDocument extends Document {
    client?: UserDocument | Types.ObjectId;
    products?: Array<ProductDocument> | Types.ObjectId;
    tax?: number;
    totalPrice?: number;
    status?: number;
    paidDate?: Date;
    review?: Types.ObjectId; //Falta
}

const billSchema = new Schema <BillDocument>({
    client: {
        type: Schema.Types.ObjectId,
        required: [true, 'Ingrese cliente']
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    }],
    tax: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
      type: Number,
      default: 0
    },
    paidDate: {
      type: Date
    }
    //review
})

//MODELS
export const Bill = model<BillDocument>('Bill', billSchema);
export const BillTC = composeMongoose<BillDocument, any>(Bill);

//RELATIONS
BillTC.addRelation('products', {
    resolver() {
      return ProductTC.mongooseResolvers.dataLoaderMany();
    },
    prepareArgs: {
      _ids: (source) => source.products,
      skip: null,
      sort: null,
    },
    projection: { products: 1 },
  });

  BillTC.addRelation('client', {
    resolver() {
      return UserTC.mongooseResolvers.dataLoader();
    },
    prepareArgs: {
      _id: (source) => source.client,
      skip: null,
      sort: null,
    },
    projection: { client: 1 },
  });
