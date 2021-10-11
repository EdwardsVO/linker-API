import {
    UserTC
} from '../models/index.js'

//USER

const Query = {
    //USER
    user: UserTC.mongooseResolvers.findOne(),
    users: UserTC.mongooseResolvers.findMany(),
    userPagination: UserTC.mongooseResolvers.pagination()
};

export default Query;