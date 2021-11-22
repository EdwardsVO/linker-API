import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { EnterpriseDocument, EnterpriseTC, UserDocument, UserTC, ProductDocument, ProductTC } from './';

export interface ReviewDocument extends Document {
    client: UserDocument | Types.ObjectId,
    product: ProductDocument | Types.ObjectId,
    enterprise: EnterpriseDocument | Types.ObjectId,
    productComment: string,
    productRating: number,
    enterpriseComment: string,
    enterpriseRating: number
}

const reviewSchema = new Schema<ReviewDocument>({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    enterprise: {
        type: Schema.Types.ObjectId,
        ref: 'enterprise'
    },
    productComment: {
        type: String,
        default: ""
    },
    productRating: {
        type: Number,
        default: 0
    },
    enterpriseComment: {
        type: String,
        default: ""
    },
    enterpriseRating: {
        type: Number,
        default: 0
    }
})

//MODELS
export const Review = model<ReviewDocument>('Review', reviewSchema);
export const ReviewTC = composeMongoose<ReviewDocument, any>(Review);

//RELATIONS

ReviewTC.addRelation('enterprise', {
    resolver() {
      return EnterpriseTC.mongooseResolvers.dataLoader();
    },
    prepareArgs: {
      _id: (source) => source.enterprise,
      skip: null,
      sort: null,
    },
    projection: { enterprise: 1 },
  });



ReviewTC.addRelation('client', {
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


ReviewTC.addRelation('product', {
    resolver() {
      return ProductTC.mongooseResolvers.dataLoader();
    },
    prepareArgs: {
      _id: (source) => source.product,
      skip: null,
      sort: null,
    },
    projection: { product: 1 },
  });
