import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { EnterpriseDocument, EnterpriseTC } from './Enterprise'

export interface ProductDocument extends Document {
    name?: string,
    serial?: string,
    description?: string,
    category?: number,
    price?: number,
    productStatus?: number,
    images?: Array<string>,
    rating?: number,
    quantity?: number,
    units?: number,
    review?: Types.ObjectId, // BuyerReviewDocument []
    enterprise?: EnterpriseDocument | Types.ObjectId,
    uploadedDate?: Date,
    visibility?: number,
    questions?: Types.ObjectId // QuestionsDocument[]
}

const productSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: [true, 'Ingrese nombre del producto']
        },
        serial: {
            type: String,
            required: [true, 'Ingrese serial del producto']
        },
        description: {
            type: String,
            required: [true, 'Ingrese una descripcion para el producto']
        },
        category: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'Ingrese precio del producto']
        },
        productStatus: {
            type: Number,
            required: [true, 'Ingrese el status del producto'],
            default: 0
        },
        quantity: {
            type: Number,
            required: [true, 'Ingrese cantidad de unidades del producto']
        },
        units: {
            type: Number,
            required: [true, 'Ingrese unidades de medicion para la cantidad del producto']
        },
        images: [{
            url: {
                type: String,
                default: ''
            }
        }],
        rating: {
            type: Number,
            default: 0
        },
        review: [{
            type: Schema.Types.ObjectId,
            ref: 'reviews'
        }],
        enterprise: {
            type: Schema.Types.ObjectId,
            ref: 'enterprise'
        },
        visibility: {
            type: Number,
            default: 0
        },
        questions: [{
            type: Schema.Types.ObjectId,
            ref: 'questions'
        }]
    }
)

//MODELS
export const Product = model<ProductDocument>('Product', productSchema);
export const ProductTC = composeMongoose<ProductDocument, any>(Product);

//RELATIONS

ProductTC.addRelation('enterprise', {
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