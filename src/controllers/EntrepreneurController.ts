import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import { CreateEntrepreneurInput, TCreateEntrepreneurInput } from '../types';
import { UserTC, User, ShoppingCart } from '../models';

export const createEntrepreneur = schemaComposer.createResolver<
  any,
  {
    data: TCreateEntrepreneurInput;
  }
>({
  name: 'createEntrepreneur',
  type: UserTC.getType(),
  description: 'create a new entrepreneur',
  kind: 'mutation',
  args: { data: CreateEntrepreneurInput },
  async resolve({ args, context }) {
    // SECURITY

    // ARGS
    const { username, firstName, lastName, dni, email, photo } =
      args.data.createEntrepreneurInfo;
    // VALIDATORS

    const entrepreneurExist = await User.findOne({ dni, role: 1 }).exec();
    if (entrepreneurExist) {
      throw new ApolloError('Error: Emprendedor existente');
    }
    // CREATING SHOPPING CART

    const shopCart = await ShoppingCart.create({
      products: [],
    });
    console.log(shopCart);

    // CREATING NEW ENTREPRENEUR
    const entrepreneur = await User.create({
      username,
      firstName,
      lastName,
      dni,
      email,
      photo,
      role: 1,
      status: 1,
    });
    entrepreneur.shoppingCart = shopCart;
    entrepreneur.save();
    console.log(entrepreneur);
    return entrepreneur;
  },
});
