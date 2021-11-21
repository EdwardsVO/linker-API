import { schemaComposer } from 'graphql-compose';
import Query from './Query';
import Mutation from './Mutation';
import CustomQuery from './CustomQuery';
import CustomMutation from './CustomMutation';

schemaComposer.Query.addFields({
  ...Query,
  ...CustomQuery,
});

schemaComposer.Mutation.addFields({
  ...Mutation,
  ...CustomMutation,
});

const schema = schemaComposer.buildSchema();


export default schema;
