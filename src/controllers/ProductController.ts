import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import {
    CreateProductInput,
    TCreateProductInput
} from '../types';
import {
    ProductTC,
    Product,
    ProductDocument,
    Enterprise,
    EnterpriseDocument,
} from '../models';

export const createProduct = schemaComposer.createResolver<
    any,
    {
        data: TCreateProductInput;
    }
>({
    name: 'createProduct',
    type: ProductTC.getType(),
    description: 'Create a new enterprise product',
    kind: 'mutation',
    args: { data: CreateProductInput },
    async resolve({ args, context }){
        //SECURITY

        //ARGS

        const {
            name,
            description,
            price,
            enterprise,
            serial,
            quantity,
            category,
            units
        } = args.data.createProductInfo

        const  images  = args.data.createProductImages

        //VALIDATORS
        
        const productExist =  await Product.findOne({ serial }).exec();
        const enterpriseExist = await Enterprise.findById(enterprise).exec();

        if(!enterpriseExist) {
            throw new ApolloError ('Empresa inexistente');
        }

        if(productExist) {
            throw new ApolloError ('Producto existente');
        }
        
        //CREATING NEW PRODUCT
        const product = await Product.create({
            name,
            description,
            price,
            enterprise,
            serial,
            quantity,
            category,
            units,
            images
        })
        
        
        //PUSHING PRODUCT INTO ENTERPRISE PRODUCTS
        
    }
})
