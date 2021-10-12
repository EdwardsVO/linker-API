//import bcrypt from 'bcryptjs';
import { Schema, Document, Types, model} from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { EnterpriseDocument, EnterpriseTC } from './Enterprise'

export interface UserDocument extends Document {
    username?: string;
    dni?: string;
    firstName?: string;
    lastName: string;
    image?: string;
    phone?: string;
    email?: string;
    role?: number;
    status?: number;
    category?: number;
    buyerRating?: number;
    summaryShop?: Types.ObjectId //|| BillDocument[]
    shoppingCart?: Types.ObjectId; //|| ShopingCarDocument
    enterprise?: EnterpriseDocument | Types.ObjectId; //
    reviewsMade?: Types.ObjectId; //|| BuyerReviewDocument[]
    questionsMade?: Types.ObjectId; //||QuestionsMadeDocument[]
    createdAt?: Date;
    updatedAt ?: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Ingrese username"]
        },
        dni: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Ingrese Cedula']
        },
        firstName: {
            type: String,
            required: [true, 'Ingrese nombre']
        },
        lastName: {
            type: String,
            required: [true, 'Ingrese apellido']
        },
        image: {
            type: String,
            default: '',
            trim: true
        },
        phone: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Ingrese correo']
        },
        role: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            default: 0
        },
        category: {
            type: Number,
            default: 0
        },
        buyerRating: {
            type: Number,
            default: 0
        },
        summaryShop: [{
            type: Schema.Types.ObjectId,
            ref: 'SummaryShop'
        }],
        shoppingCart: {
            type: Schema.Types.ObjectId,
            ref: 'ShoppingCar'
        },
        enterprise: {
            type: Schema.Types.ObjectId,
            ref: 'enterprise'
        },
        reviewsMade: [{
            type: Schema.Types.ObjectId,
            ref: 'reviewsMade'
        }],
        questionsMade: [{
            type: Schema.Types.ObjectId,
            ref: 'questionsMade'
        }]
    }
)

//PASSWORD HASHING

//DOCUMENTS
    export const User = model<UserDocument>('User', userSchema);
    export const UserTC = composeMongoose<UserDocument,any>(User);

//ADDING RELATIONS

UserTC.addRelation('enterprises', {
    resolver() {
      return EnterpriseTC.mongooseResolvers.dataLoaderMany();
    },
    prepareArgs: {
      _ids: (source) => source.enterprise,
      skip: null,
      sort: null,
    },
    projection: { enterprises: 1 },
  });

//   UserTC.addRelation('shoppingCar', {
//     resolver() {
//       return ShoppingCarTC.mongooseResolvers.dataLoader();
//     },
//     prepareArgs: {
//       _ids: (source) => source.shoppingCar,
//       skip: null,
//       sort: null,
//     },
//     projection: { shoppingCar: 1 },
//   });
