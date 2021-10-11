//import bcrypt from 'bcryptjs';
import { Schema, Document, Types, model} from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface UserDocument extends Document {
    username?: string;
}

const userSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Ingrese username"]
        }
    }
)

//PASSWORD HASHING

//DOCUMENTS
    export const User = model<UserDocument>('User', userSchema);
    export const UserTC = composeMongoose<UserDocument,any>(User);