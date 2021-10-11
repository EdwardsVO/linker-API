"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/variables.env' });
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema"));
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT);
//DATABASE CONNECTION
mongoose_1.default.
    connect(String(process.env.DATABASE))
    .then(() => {
    console.log(`😎🤩 MongoDB running`);
}).catch((err) => {
    console.log(process.env.DATABASE);
    console.log(`ERROR🤬🤬 ${err}`);
});
mongoose_1.default.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);
//APOLLO SERVER
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    introspection: true,
    context: ({ req, res }) => {
        var _a, _b, _c, _d;
        if (((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.operationName) !== null && _b !== void 0 ? _b : '') !== 'IntrospectionQuery') {
            console.log(`GraphQL: ${(_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.operationName) !== null && _d !== void 0 ? _d : '-'} ${req.headers['content-length']}`);
        }
        return {
            req,
            res,
        };
    },
});
server.applyMiddleware({
    app: app_1.default,
    cors: {
        credentials: true,
        origin: [
            process.env.CLIENT_URL,
            process.env.DASHBOARD_URL,
            process.env.CLIENT_URL_WWW,
            process.env.DASHBOARD_URL_WWW,
        ],
    },
});
//EXPRESS
app_1.default.listen({ port: PORT }, () => console.log(`🚀🛸Server ready at http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map