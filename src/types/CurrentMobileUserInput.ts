import { Types } from 'mongoose';

export const GetCurrentUserMobile = `
    input GetCurrentUserMobile {
        getCurrentUserInfo: GetCurrentUserInfo
    } 

    input GetCurrentUserInfo {
        token: String!
    }
`;

export type TGetCurrentUserMobile = {
    getCurrentUserInfo: {
        token: string;
    }
}

