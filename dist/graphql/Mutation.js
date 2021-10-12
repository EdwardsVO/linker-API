"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
//USER
const Mutation = {
    //USER
    createUser: index_js_1.UserTC.mongooseResolvers.createOne(),
    removeUser: index_js_1.UserTC.mongooseResolvers.removeOne(),
    updateUser: index_js_1.UserTC.mongooseResolvers.updateOne(),
    //ENTERPRISE
    createEnterprise: index_js_1.EnterpriseTC.mongooseResolvers.createOne(),
    removeEnterprise: index_js_1.EnterpriseTC.mongooseResolvers.removeOne(),
    updateEnterprise: index_js_1.EnterpriseTC.mongooseResolvers.updateOne(),
    //PRODUCT
    createProduct: index_js_1.ProductTC.mongooseResolvers.createOne(),
    removeProduct: index_js_1.ProductTC.mongooseResolvers.removeOne(),
    updateProduct: index_js_1.ProductTC.mongooseResolvers.updateOne(),
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map