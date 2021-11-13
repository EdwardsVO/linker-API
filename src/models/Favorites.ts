import { Schema, Document, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { ProductDocument, ProductTC } from './Product';

export interface FavoritesDocument extends Document {
  products?: Array<ProductDocument>;
}

const favoritesSchema = new Schema<FavoritesDocument>({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    },
  ],
});

export const Favorites = model<FavoritesDocument>(
  'Favorites',
  favoritesSchema
);
export const FavoritesTC = composeMongoose<FavoritesDocument, any>(
  Favorites
);

// RELATIONS

FavoritesTC.addRelation('products', {
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
