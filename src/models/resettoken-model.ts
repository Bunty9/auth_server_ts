import { Schema, model } from "mongoose";

export interface ResetToken {
    user: Schema.Types.ObjectId; // Reference to the User model
    resetToken: string;
}

const schema = new Schema<ResetToken>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resetToken: {
        type: String,
        unique: true,
        required: true
    }
    
});

export const ResetTokenModel = model<ResetToken>("ResetToken", schema);
