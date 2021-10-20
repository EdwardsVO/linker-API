import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ProductDocument, ProductTC } from './Product';
import { UserDocument, UserTC } from './User'

export interface ShoppingCartDocument extends Document {
    products?: Array<ProductDocument>;
}

const shoppingCartSchema = new Schema<ShoppingCartDocument>(
    {
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Products'

        }],
    }
)

export const ShoppingCart = model<ShoppingCartDocument>('ShoppingCart', shoppingCartSchema);
export const ShoppingCartTC = composeMongoose<ShoppingCartDocument, any>(ShoppingCart);