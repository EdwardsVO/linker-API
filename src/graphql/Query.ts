import {
    UserTC,
    EnterpriseTC,
    ProductTC
} from '../models/index.js'

//USER

const Query = {
    //USER
    user: UserTC.mongooseResolvers.findOne(),
    users: UserTC.mongooseResolvers.findMany(),
    userPagination: UserTC.mongooseResolvers.pagination(),
    //ENTERPRISE
    enterprise: EnterpriseTC.mongooseResolvers.findOne(),
    enterprisePagination: EnterpriseTC.mongooseResolvers.pagination(),
    //PRODUCT
    product: ProductTC.mongooseResolvers.findOne(),
    products: ProductTC.mongooseResolvers.findMany(),
    productPagination: ProductTC.mongooseResolvers.pagination()
};

export default Query;
