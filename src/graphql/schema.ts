import Query from './Query';
import Mutation from './Mutation';
import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
    ...Query,
});

schemaComposer.Mutation.addFields({
    ...Mutation,
});

const schema = schemaComposer.buildSchema();

export default schema;