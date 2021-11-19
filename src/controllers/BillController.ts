import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import { CreateBillInput, TCreateBillInput } from '../types';
import { BillTC, Bill, User, Enterprise } from '../models';

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
    // SECURITY

    // ARGS
    const { client, totalPrice, enterprise, enterpriseOwner } = args.data.createBillInfoInput;
    const products = args.data.addingProducts;
    const taxCharge = 0.16 // 16% TAX FOR EACH PURCHASE
    const clientIn = await User.findById(client).exec();
    const enterpriseIn = await Enterprise.findById(enterprise).exec();

    const initPurchasing = async() => {

      const tax = totalPrice * taxCharge 
      var currentClientBalance = clientIn.get('balance');
      var currentSummaryShop = clientIn.get('summaryShop'); //GETTING THE CLIENT SUMMARY SHOP TO PUSH THE NEW BILL
      if(currentClientBalance < totalPrice) {
        throw new ApolloError('Saldo insuficiente') //VALIDATION
      }

      // GENERATING THE BILL
      const bill = await Bill.create({
        enterprise,
        enterpriseOwner,
        tax,
        products,
        totalPrice,
        client,
        status: 1,
      });

      currentClientBalance -= totalPrice; //REDUCING THE BALANCE AFTER THE PURCHASE
      clientIn.balance = currentClientBalance;
      currentSummaryShop.push(bill); 
      clientIn.summaryShop = currentSummaryShop; //PUSHING THE CLIENT PURCHASE SUMMARY THE GENERATED BILL
      await clientIn.save()

      const currentSalesSummary = enterpriseIn.get('salesSummary');
      var currentEnterpriseBalance = enterpriseIn.get('balance');
      currentSalesSummary.push(bill);
      enterpriseIn.salesSummary = currentSalesSummary; //PUSHING ENTERPRISE THE GENERATED BILL 
      currentEnterpriseBalance += totalPrice;
      enterpriseIn.balance = currentEnterpriseBalance; //ADDING THE NEW BALANCE OF THE ENTERPRISE AFTER THE SALE
      await enterpriseIn.save();

      return bill;
    }

    return initPurchasing();
  
  },
});
