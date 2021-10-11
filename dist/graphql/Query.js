"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
//USER
const Query = {
    //USER
    user: index_js_1.UserTC.mongooseResolvers.findOne(),
    users: index_js_1.UserTC.mongooseResolvers.findMany(),
    userPagination: index_js_1.UserTC.mongooseResolvers.pagination()
};
exports.default = Query;
//# sourceMappingURL=Query.js.map