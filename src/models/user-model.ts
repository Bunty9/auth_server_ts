import { Document, Schema, model } from "mongoose";

export interface User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    verified: boolean,
    activation_link: string
}

const schema = new Schema<User>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    activation_link: {
        type: String,
    }
});

export const UserModel = model<User>("User", schema);