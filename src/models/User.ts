// import bcrypt from 'bcryptjs';
import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { EnterpriseDocument, EnterpriseTC } from './Enterprise';
import { FavoritesDocument, FavoritesTC } from './Favorites';
import {ShoppingCartDocument, ShoppingCartTC } from './ShoppingCart';
import { BillDocument, BillTC } from './Bill';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  username?: string;
  dni?: string;
  firstName?: string;
  lastName: string;
  image?: string;
  phone?: string;
  email?: string;
  balance?: number;
  role?: number;
  status?: number;
  category?: number;
  buyerRating?: number;
  password?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  summaryShop?: BillDocument | Types.ObjectId;
  shoppingCart?: ShoppingCartDocument | Types.ObjectId;   
  enterprise?: EnterpriseDocument | Types.ObjectId; //
  reviewsMade?: Types.ObjectId; // || BuyerReviewDocument[]
  questionsMade?: Types.ObjectId; // ||QuestionsMadeDocument[]
  createdAt?: Date;
  updatedAt?: Date;
  favorites?: FavoritesDocument | Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Ingrese username'],
  },
  dni: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Ingrese Cedula'],
  },
  firstName: {
    type: String,
    required: [true, 'Ingrese nombre'],
  },
  lastName: {
    type: String,
    required: [true, 'Ingrese apellido'],
  },
  image: {
    type: String,
    default: '',
    trim: true,
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Ingrese correo'],
  },
  balance: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: [true, 'Ingrese Contraseña']
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Number,
  },
  role: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    default: 0,
  },
  buyerRating: {
    type: Number,
    default: 0,
  },
  summaryShop: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SummaryShop',
    },
  ],
  enterprise: {
    type: Schema.Types.ObjectId,
    ref: 'enterprise',
  },
  reviewsMade: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reviewsMade',
    },
  ],
  questionsMade: [
    {
      type: Schema.Types.ObjectId,
      ref: 'questionsMade',
    },
  ],
  favorites: {
    type: Schema.Types.ObjectId,
    ref: 'shoppingCart',
  },
});

// PASSWORD HASHING

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// DOCUMENTS
export const User = model<UserDocument>('User', userSchema);
export const UserTC = composeMongoose<UserDocument, any>(User);

// ADDING RELATIONS

//ENTERPRISE RELATION
UserTC.addRelation('enterprise', {
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

//SHOPPING CART RELATION
UserTC.addRelation('shoppingCart', {
  resolver() {
    return ShoppingCartTC.mongooseResolvers.dataLoader();
  },
  prepareArgs: {
    _id: (source) => source.favorites,
    skip: null,
    sort: null,
  },
  projection: { shoppingCart: 1 },
});

// BILLS RELATION

UserTC.addRelation('bill', {
  resolver() {
    return BillTC.mongooseResolvers.dataLoader();
  },
  prepareArgs: {
    _id: (source) => source.favorites,
    skip: null,
    sort: null,
  },
  projection: { bill: 1 },
});

// FAVORITES RELATION
UserTC.addRelation('favorites', {
  resolver() {
    return FavoritesTC.mongooseResolvers.dataLoader();
  },
  prepareArgs: {
    _id: (source) => source.favorites,
    skip: null,
    sort: null,
  },
  projection: { favorites: 1 },
});

