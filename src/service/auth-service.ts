import { UserModel } from "../models/user-model"
import { ApiError } from "../exceptions/api-error";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service";
import { UserDto } from "../dtos/user-dto";
import tokenService from "./token-service";
import { ObjectId } from "mongoose";



interface SignUpPayload {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirmpassword: string
}

interface LoginPayload {
    email: string,
    password: string
}

class AuthService {

    async signup(payload: SignUpPayload) {
        // console.log(payload)
        const email = payload.email
        const candidate = await UserModel.findOne({ email })
        // console.log(candidate)

        if (payload.password !== payload.confirmpassword) {
            throw ApiError.BadRequest('Passwords do not match please confirm password')
        } // check if confirm passwords match
        if (candidate) {
            throw ApiError.BadRequest(`The user with email ${email} is already in use`);
        } // check if user already exists
        const hashpassword = await bcrypt.hash(payload.password, 10) //hash password
        const activation_link = uuidv4() //activationlink uid
        //create user in db
        const user = await UserModel.create({
            first_name: payload.first_name,
            last_name: payload.last_name,
            email,
            password: hashpassword,
            verified: false,
            activation_link
        })
        //send activation link to user
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activation_link}`
        )
        // pasrse new user in dto
        const userDto = new UserDto({
            _id: user._id as unknown as ObjectId,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            verified: user.verified,
            activation_link: user.activation_link,
        })
        //generate and save refresh and access token
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async login(payload: LoginPayload) {
        const email = payload.email
        const payloadpassword = payload.password
        const candidate = await UserModel.findOne({ email })
        if (!candidate) {
            throw ApiError.BadRequest(`The user with email ${email} does not exist, Try Sign Up`);
        }
        const isPassMatch = await bcrypt.compare(payloadpassword, candidate.password)
        if (!isPassMatch) {
            throw ApiError.UnauthorizedError(`Incorrect Password.`);
        }
        const userDto = new UserDto({
            _id: candidate._id as unknown as ObjectId,
            first_name: candidate.first_name,
            last_name: candidate.last_name,
            email: candidate.email,
            verified: candidate.verified,
            activation_link: candidate.activation_link,
        })
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken: any) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async verify(activationLink: any) {
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Incorrect link activation')
        }
        user.verified = true;
        await user.save();
    }

    async refresh(refreshToken: any) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError(`Invalid Refresh Token.`);
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError(`Invalid Refresh Token.`);
        }
        const user = await UserModel.findById(tokenFromDb.user);
        if (!user) {
            throw ApiError.UnauthorizedError(`User not found.`);
        }
        // pasrse new user in dto
        const userDto = new UserDto({
            _id: user._id as unknown as ObjectId,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            verified: user.verified,
            activation_link: user.activation_link,
        })
        //generate and save refresh and access token
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }


}

export default new AuthService()