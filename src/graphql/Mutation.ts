import {
    UserTC
} from '../models/index.js'

//USER

const Mutation = {
    //USER
    createUser: UserTC.mongooseResolvers.createOne(),

};

export default Mutation;