/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config({ path: './variables.env' });
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import app from './app';

const PORT = Number(process.env.PORT);

// DATABASE CONNECTION
mongoose
  .connect(String(process.env.DATABASE))
  .then(() => {
    console.log(`😎🤩 MongoDB running`);
  })
  .catch((err) => {
    console.log(process.env.DATABASE);
    console.log(`ERROR🤬🤬 ${err}`);
  });
mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

// APOLLO SERVER

const server: ApolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: ({ req, res }) => {
    if ((req?.body?.operationName ?? '') !== 'IntrospectionQuery') {
      console.log(
        `GraphQL: ${req?.body?.operationName ?? '-'} ${req.headers['content-length']
        }`
      );
    }
    return {
      req,
      res,
    };
  },
});

server.applyMiddleware({
  app,
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

// EXPRESS

app.listen({ port: PORT }, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀🛸Server ready at http://localhost:${PORT}`)
  }

  console.log("Welcome to Linker Server!!!👽")
});
