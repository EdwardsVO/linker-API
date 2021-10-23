import { ApolloError } from 'apollo-server';
import { schemaComposer } from 'graphql-compose';
import { CreateProductInput, TCreateProductInput } from '../types';
import { ProductTC, Product, ProductDocument, Enterprise } from '../models';

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
  async resolve({ args, context }) {
    // SECURITY

    // ARGS

    const {
      name,
      description,
      price,
      enterprise,
      serial,
      quantity,
      category,
      units,
    } = args.data.createProductInfo;

    const images = args.data.createProductImages;

    // VALIDATORS

    const enterpriseExist = await Enterprise.findById(enterprise).exec();

    if (!enterpriseExist) {
      throw new ApolloError('Empresa inexistente');
    }

    // PUSHING PRODUCT INTO ENTERPRISE PRODUCTS
    const productIntoEnterprise = async (newProduct: ProductDocument) => {
      const productsList = enterpriseExist.get('products');
      productsList.push(newProduct);
      enterpriseExist.products = productsList;
      await enterpriseExist.save();

      return newProduct; // CONTROLLER ENDS
    };

    // CREATING NEW PRODUCT
    const product = async () => {
      const newProduct = await Product.create({
        name,
        description,
        price,
        enterprise,
        serial,
        quantity,
        category,
        units,
        images,
      });
      return productIntoEnterprise(newProduct);
    };

    return product();
  },
});
