"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTC = exports.User = void 0;
//import bcrypt from 'bcryptjs';
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Ingrese username"]
    }
});
//PASSWORD HASHING
//DOCUMENTS
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.UserTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.User);
//# sourceMappingURL=User.js.map