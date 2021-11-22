import { schemaComposer } from "graphql-compose";
import { v4 as uuid } from "uuid";
import { ApolloError } from "apollo-server";
import { sendResetPasswordEmail } from "../utils/email";
import { CreateReviewInput, TCreateReviewInput } from "../types";
import {
  UserTC,
  User,
  Enterprise,
  EnterpriseDocument,
  Review,
  ReviewTC,
  Product,
  ProductTC
} from "../models";

export const setReview = schemaComposer.createResolver<
    any,
    {
        data: TCreateReviewInput;
    }
>({
    name: "setReview",
    type: ReviewTC.getType(),
    description: "Setting review within a product",
    kind: "mutation",
    args: { data: CreateReviewInput },
    async resolve({ args, context }) {

        const { client, enterprise, product, productComment, productRating } = args.data.createReviewInfoInput
        
        //GET VARIABLES OBJECTS
        const clientIn = await User.findById(client).exec();  //CLIENT OBJECT
        const productIn = await Product.findById(product).exec(); //PRODUCT OBJECT
        var currentUserReviews =  clientIn.get('reviewsMade'); //CLIENT PREV REVIEWS
        var currentProductReviews = productIn.get('review'); //PRODUCT PREV REVIEWS
  
        
        var currentProductRating = 0;



        //CREATING COMMENT
        const review = await Review.create({
            client,
            enterprise,
            product,
            productComment,
            productRating
        });

        currentUserReviews.push(review);
        currentProductReviews.push(review);

        clientIn.reviewsMade = currentUserReviews;
        productIn.review = currentProductReviews;

        for(let i = 0; i < currentProductReviews.length; i++ ) {
            let prev = await Review.findById(currentProductReviews[i]);
            currentProductRating += prev.productRating
        }
        currentProductRating = currentProductRating / currentProductReviews.length

        await clientIn.save();
        await productIn.save();

        
        return review;
    }
});