import { ObjectId } from "mongoose";

export class UserDto {
    _id: string | ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    verified: boolean;
    activationLink?: string;


    constructor(user: { _id: string | ObjectId; first_name: string; last_name: string; email: string; verified: boolean; activation_link:string }) {
        this._id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.verified = user.verified;
        this.activationLink= user.activation_link
    }
}
