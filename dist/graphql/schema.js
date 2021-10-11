"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = __importDefault(require("./Query"));
const Mutation_1 = __importDefault(require("./Mutation"));
const graphql_compose_1 = require("graphql-compose");
graphql_compose_1.schemaComposer.Query.addFields(Object.assign({}, Query_1.default));
graphql_compose_1.schemaComposer.Mutation.addFields(Object.assign({}, Mutation_1.default));
const schema = graphql_compose_1.schemaComposer.buildSchema();
exports.default = schema;
//# sourceMappingURL=schema.js.map