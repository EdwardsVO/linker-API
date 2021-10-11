"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
//USER
const Mutation = {
    //USER
    createUser: index_js_1.UserTC.mongooseResolvers.createOne(),
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map