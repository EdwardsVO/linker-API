import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import {
    CreateSupplierInput,
    TCreateSupplierInput
} from '../types';
import {
    UserTC,
    User,
    UserDocument,
    Enterprise,
    EnterpriseDocument,
} from '../models';
