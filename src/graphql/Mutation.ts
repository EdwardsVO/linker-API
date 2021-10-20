import {
    UserTC,
    EnterpriseTC,
    ProductTC,
    
} from '../models/index.js'

//USER

const Mutation = {
    //USER
    createUser: UserTC.mongooseResolvers.createOne(),
    removeUser: UserTC.mongooseResolvers.removeOne(),
    updateUser: UserTC.mongooseResolvers.updateOne(),
    //ENTERPRISE
    createEnterprise: EnterpriseTC.mongooseResolvers.createOne(),
    removeEnterprise: EnterpriseTC.mongooseResolvers.removeOne(),
    updateEnterprise: EnterpriseTC.mongooseResolvers.updateOne(),
    //PRODUCT
    createProduct: ProductTC.mongooseResolvers.createOne(),
    removeProduct: ProductTC.mongooseResolvers.removeOne(),
    updateProduct: ProductTC.mongooseResolvers.updateOne(),
    //BILL
};

export default Mutation;