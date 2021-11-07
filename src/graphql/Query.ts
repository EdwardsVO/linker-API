import {
  UserTC,
  EnterpriseTC,
  ProductTC,
  BillTC,
  FavoritesTC,
} from '../models/index.js';

// USER

const Query = {
  // USER
  user: UserTC.mongooseResolvers.findOne(),
  users: UserTC.mongooseResolvers.findMany(),
  userPagination: UserTC.mongooseResolvers.pagination(),
  // ENTERPRISE
  enterprise: EnterpriseTC.mongooseResolvers.findOne(),
  enterprises: EnterpriseTC.mongooseResolvers.findMany(),
  enterprisePagination: EnterpriseTC.mongooseResolvers.pagination(),
  // PRODUCT
  product: ProductTC.mongooseResolvers.findOne(),
  products: ProductTC.mongooseResolvers.findMany(),
  productPagination: ProductTC.mongooseResolvers.pagination(),
  // BILLS
  bill: BillTC.mongooseResolvers.findOne(),
  bills: BillTC.mongooseResolvers.findMany(),
  // SHOPPING CART
  favorite: FavoritesTC.mongooseResolvers.findOne(),
  favorites: FavoritesTC.mongooseResolvers.findMany(),
};

export default Query;
