import { Schema, Document, Types, model} from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ProductDocument, ProductTC } from './Product';
import { UserDocument, UserTC } from './User'

export interface ShoppingCartDocument extends Document {
    client: UserDocument | Types.ObjectId;
    products: Array<ProductDocument> | Types.ObjectId;
    tax: number;
    totalPrice: number;
    status: number;
}

const shoppingCartSchema = new Schema <ShoppingCartDocument>({
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
    }
})

//MODELS
export const ShoppingCart = model<ShoppingCartDocument>('ShoppingCart', shoppingCartSchema);
export const ShoppingCartTC = composeMongoose<ShoppingCartDocument, any>(ShoppingCart);

//RELATIONS
ShoppingCartTC.addRelation('products', {
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

  ShoppingCartTC.addRelation('client', {
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
