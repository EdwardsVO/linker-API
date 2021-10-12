"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
//USER
const Query = {
    //USER
    user: index_js_1.UserTC.mongooseResolvers.findOne(),
    users: index_js_1.UserTC.mongooseResolvers.findMany(),
    userPagination: index_js_1.UserTC.mongooseResolvers.pagination(),
    //ENTERPRISE
    enterprise: index_js_1.EnterpriseTC.mongooseResolvers.findOne(),
    enterprises: index_js_1.EnterpriseTC.mongooseResolvers.findMany(),
    enterprisePagination: index_js_1.EnterpriseTC.mongooseResolvers.pagination(),
    //PRODUCT
    product: index_js_1.ProductTC.mongooseResolvers.findOne(),
    products: index_js_1.ProductTC.mongooseResolvers.findMany(),
    productPagination: index_js_1.ProductTC.mongooseResolvers.pagination()
};
exports.default = Query;
//# sourceMappingURL=Query.js.map