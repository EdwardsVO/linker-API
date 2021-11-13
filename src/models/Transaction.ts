import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, UserTC } from './';

export interface TransactionDocument extends Document {
    clientId: UserDocument | Types.ObjectId;
    transactionId: string;
    amount: number;
    status: number;
    createdAt: Date;
}


const transactionSchema = new Schema<TransactionDocument>({
    clientId: {
        type: Schema.Types.ObjectId,
        required: [ true, 'Ingrese usuario que realiza la transaccion' ]
    },
    transactionId: {
        type: String,
        required: [ true, 'Ingrese ID de la transaccion' ]
    },
    amount: {
        type: Number,
        required: [ true, 'Ingrese monto requerido' ]
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Number,
        default: 0
    }
});

export const Transaction = model<TransactionDocument>('Transaction', transactionSchema);
export const TransactionTC = composeMongoose<TransactionDocument, any>(Transaction);


TransactionTC.addRelation('clientId', {
    resolver() {
      return UserTC.mongooseResolvers.dataLoader();
    },
    prepareArgs: {
      _id: (source) => source.clientId,
      skip: null,
      sort: null,
    },
    projection: { clientId: 1 },
  });