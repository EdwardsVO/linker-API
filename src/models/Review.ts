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
        required: [ true, 'Ingrese comentario para el review' ]
    },
    productRating: {
        type: Number,
        required: [ true, 'Ingrese rating para el producto' ]
    },
    enterpriseComment: {
        type: String,
        required: [ true, 'Ingrese comentario para el servicio de la empresa' ]
    },
    enterpriseRating: {
        type: Number,
        required: [ true, 'Ingrese rating para el servicio de la empresa' ]
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
