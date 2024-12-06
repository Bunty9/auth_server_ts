import { ObjectId } from "mongoose";
import { UserDto } from "../dtos/user-dto";
import { UserModel } from "../models/user-model";
import { ApiError } from "../exceptions/api-error";


class UserService {
    async getuser(userid:string | ObjectId) {
        const candidate = await UserModel.findById(userid)
        if (!candidate) {
            throw ApiError.BadRequest(`User data not found`);
        }
        const userDto = new UserDto({
            _id: candidate._id as unknown as ObjectId,
            first_name: candidate.first_name,
            last_name: candidate.last_name,
            email: candidate.email,
            verified: candidate.verified,
            activation_link: candidate.activation_link,
        })
        return {user: userDto}
    }
}


export default new UserService()