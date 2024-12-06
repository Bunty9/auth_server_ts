import { Schema, model } from "mongoose";

export interface Token {
    user: Schema.Types.ObjectId; // Reference to the User model
    refreshToken: string;
}

const schema = new Schema<Token>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    refreshToken: {
        type: String,
        unique: true,
        required: true
    }
});

export const TokenModel = model<Token>("Token", schema);
