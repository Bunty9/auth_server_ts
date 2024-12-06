import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenModel } from "../models/token-model";
import { Document, ObjectId } from "mongoose";
import { ApiError } from "../exceptions/api-error";
import { ResetTokenModel } from "../models/resettoken-model";

interface TokenPayload {
    _id: string | ObjectId;
    email: string;
    verified: boolean;
}

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface UserJwtPayload extends JwtPayload {
    _id: string | ObjectId;
    email: string;
    verified: boolean;
}

class TokenService {
    generateTokens(payload: UserJwtPayload): Tokens {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '3000s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(accesstoken: string): UserJwtPayload | null {
        try{
            const userData = jwt.verify(accesstoken, process.env.JWT_ACCESS_SECRET as string) as UserJwtPayload;
            return userData;
        } catch(e){
            return null ;
        }
    }
    validateRefreshToken(refreshToken: string): UserJwtPayload | null {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as UserJwtPayload;
            return userData;
        } catch(e){
            return null;
        }
    }
    async saveToken(userId: string | ObjectId, refreshToken: string): Promise<Document | null> {
        const tokenData = await TokenModel.findOne({ user: userId })
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({user: userId, refreshToken})
        return token;
    }
    async saveResetToken(userId: string | ObjectId, resetToken: string): Promise<Document | null> {
        const tokenData = await ResetTokenModel.findOne({ user: userId })
        if(tokenData){
            tokenData.resetToken = resetToken;
            return tokenData.save();
        }
        const token = await ResetTokenModel.create({user: userId, resetToken})
        return token;
    }
    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData;
    }
    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData;
    }
    
}

export default new TokenService()