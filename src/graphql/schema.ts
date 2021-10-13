import Query from './Query';
import Mutation from './Mutation';
import CustomQuery from './CustomQuery';
import CustomMutation from './CustomMutation';
import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
    ...Query,
    ...CustomQuery
});

schemaComposer.Mutation.addFields({
    ...Mutation,
    ...CustomMutation
});

const schema = schemaComposer.buildSchema();

export default schema;