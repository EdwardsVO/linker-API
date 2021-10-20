import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import {
    CreateBillInput,
    TCreateBillInput
} from '../types';
import {
    BillTC,
    Bill,
} from '../models';

export const createBill = schemaComposer.createResolver<
    any,
    {
        data: TCreateBillInput;
    }
>({
    name: 'createBill',
    type: BillTC.getType(),
    description: 'generate a new payment bill',
    kind: 'mutation',
    args: { data: CreateBillInput },
    async resolve({ args, context }) {

        //SECURITY

        //ARGS
        const {
            client,
            tax,
            totalPrice,
        } = args.data.createBillInfoInput;

        const products = args.data.addingProducts;

        //VALIDATORS
         

        //GENERATING A NEW BILL
        const bill = await Bill.create({
            tax,
            totalPrice,
            client,
            products,
            status: 0
        })
        console.log(products)
        console.log(bill)
        return bill;
    }
})

