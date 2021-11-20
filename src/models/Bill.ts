import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, UserTC, ProductDocument, ProductTC } from './';

export interface BillDocument extends Document {
  client?: UserDocument | Types.ObjectId;
  products?: ProductDocument | Types.ObjectId;
  tax?: number;
  totalPrice?: number;
  status?: number;
  createdAt?: Date;
  review?: Types.ObjectId; // Falta
  enterpriseOwner: UserDocument | Types.ObjectId;
}

const billSchema = new Schema<BillDocument>({
  client: {
    type: Schema.Types.ObjectId,
    required: [true, 'Ingrese cliente'],
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }],
  totalPrice: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0 ,
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  enterpriseOwner: {
    type: Schema.Types.ObjectId,
    ref: 'enterpriseOwner'
  }
  // review
});

// MODELS
export const Bill = model<BillDocument>('Bill', billSchema);
export const BillTC = composeMongoose<BillDocument, any>(Bill);

// RELATIONS
BillTC.addRelation("products", {
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

BillTC.addRelation('enterpriseOwner', {
  resolver() {
    return UserTC.mongooseResolvers.dataLoader();
  },
  prepareArgs: {
    _id: (source) => source.enterpriseOwner,
    skip: null,
    sort: null,
  },
  projection: { enterpriseOwner: 1 },
});
