import { Schema, Document, Types, model} from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ShoppingCartDocument, ShoppingCartTC } from './ShoppingCart';
import { UserDocument, UserTC } from './User'

export interface BillDocument extends Document {
    shoppingCart?: ShoppingCartDocument | Types.ObjectId,
    paidDate?: Date;
    status?: number;
    review?: Types.ObjectId //| ReviewDocument

}

const billSchema = new Schema<BillDocument>(
    {
        shoppingCart: {
            type: ShoppingCartTC,
            required: [true, 'Ingrese carrito de compra']
        },
        paidDate: {
            type: Date,
            required: [true, 'Ingrese fecha de pago']
        }
    }
)

//MODELS
export const Bill = model<BillDocument>('Bill', billSchema);
export const BillTC = composeMongoose<BillDocument, any>(Bill);

//RELATIONS
BillTC.addRelation('shoppingCart', {
    resolver() {
      return ShoppingCartTC.mongooseResolvers.dataLoader();
    },
    prepareArgs: {
      _id: (source) => source.shoppingCart,
      skip: null,
      sort: null,
    },
    projection: { enterprise: 1 },
  });