import {
  UserTC,
  EnterpriseTC,
  ProductTC,
  FavoritesTC,
} from '../models/index.js';

// USER

const Mutation = {
  // USER
  createUser: UserTC.mongooseResolvers.createOne(),
  removeUser: UserTC.mongooseResolvers.removeOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
  // ENTERPRISE
  createEnterprise: EnterpriseTC.mongooseResolvers.createOne(),
  removeEnterprise: EnterpriseTC.mongooseResolvers.removeOne(),
  updateEnterprise: EnterpriseTC.mongooseResolvers.updateOne(),
  // PRODUCT
  createProduct: ProductTC.mongooseResolvers.createOne(),
  removeProduct: ProductTC.mongooseResolvers.removeOne(),
  updateProduct: ProductTC.mongooseResolvers.updateOne(),
  // SHOPPING CART
  createFavorites: FavoritesTC.mongooseResolvers.createOne(),
  removeFavorites: FavoritesTC.mongooseResolvers.removeOne(),
  updateFavorites: FavoritesTC.mongooseResolvers.updateOne(),
};

export default Mutation;
