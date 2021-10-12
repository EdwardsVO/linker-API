"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTC = exports.User = void 0;
//import bcrypt from 'bcryptjs';
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const Enterprise_1 = require("./Enterprise");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Ingrese username"]
    },
    dni: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Ingrese Cedula']
    },
    firstName: {
        type: String,
        required: [true, 'Ingrese nombre']
    },
    lastName: {
        type: String,
        required: [true, 'Ingrese apellido']
    },
    image: {
        type: String,
        default: '',
        trim: true
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Ingrese correo']
    },
    role: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    category: {
        type: Number,
        default: 0
    },
    buyerRating: {
        type: Number,
        default: 0
    },
    summaryShop: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'SummaryShop'
        }],
    shoppingCart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ShoppingCar'
    },
    enterprise: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'enterprise'
    },
    reviewsMade: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'reviewsMade'
        }],
    questionsMade: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'questionsMade'
        }]
});
//PASSWORD HASHING
//DOCUMENTS
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.UserTC = (0, graphql_compose_mongoose_1.composeMongoose)(exports.User);
//ADDING RELATIONS
exports.UserTC.addRelation('enterprises', {
    resolver() {
        return Enterprise_1.EnterpriseTC.mongooseResolvers.dataLoaderMany();
    },
    prepareArgs: {
        _ids: (source) => source.enterprise,
        skip: null,
        sort: null,
    },
    projection: { enterprises: 1 },
});
//   UserTC.addRelation('shoppingCar', {
//     resolver() {
//       return ShoppingCarTC.mongooseResolvers.dataLoader();
//     },
//     prepareArgs: {
//       _ids: (source) => source.shoppingCar,
//       skip: null,
//       sort: null,
//     },
//     projection: { shoppingCar: 1 },
//   });
//# sourceMappingURL=User.js.map