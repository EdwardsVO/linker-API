import { Schema, Document, Types, model } from "mongoose";
import { composeMongoose } from "graphql-compose-mongoose";
import { ProductDocument, ProductTC } from "./Product";
import { UserDocument, UserTC } from "./User";

export interface EnterpriseDocument extends Document {
  name?: string;
  banner?: string;
  owner?: UserDocument | Types.ObjectId;
  balance?: number;
  rif?: string;
  registrationDate?: Date;
  status?: number;
  rating?: number;
  category?: number;
  products?: Array<ProductDocument> | Types.ObjectId;
  salesSummary?: Types.ObjectId; // BillDocument[]
  commentsMadeIt?: Types.ObjectId; // SellerComment[]
}

const enterpriseSchema = new Schema<EnterpriseDocument>({
  name: {
    type: String,
    required: [true, "Ingrese nombre de empresa"],
  },
  status: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
  balance: {
    type: Number,
    default: 0
  },
  rif: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Ingrese RIF de la empresa"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  salesSummary: [
    {
      type: Schema.Types.ObjectId,
      ref: "salesSummary",
    },
  ],
  commentsMadeIt: [
    {
      type: Schema.Types.ObjectId,
      ref: "commentsMadeIt",
    },
  ],
  banner: {
    type: String,
    default: "https://linker-files.sfo3.digitaloceanspaces.com/ent.jpg",
  },
});
// MODELS

export const Enterprise = model<EnterpriseDocument>(
  "Enterprise",
  enterpriseSchema
);
export const EnterpriseTC = composeMongoose<EnterpriseDocument, any>(
  Enterprise
);

// RELATIONS

EnterpriseTC.addRelation("products", {
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

EnterpriseTC.addRelation("owner", {
  resolver() {
    return UserTC.mongooseResolvers.dataLoader();
  },
  prepareArgs: {
    _id: (source) => source.owner,
    skip: null,
    sort: null,
  },
  projection: { owner: 1 },
});
