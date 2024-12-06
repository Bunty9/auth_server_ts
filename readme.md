## AUTH Server
Behold the gateway, `index.ts`, where the auth server is summoned into existence, connecting with MongoDB and paving the way for the grand journey.

+ All Authentication Methods are ready to go: SignUp, Login, Logout, VerifyEmail, ForgotPassword 
+ MongoDB for database
+ Nodemailer for Emails
+ JWT Authentication with AccessToken and RefreshToken cookies
+ Clean Typescript with no type errors


## Start Your Server 🚀
Follow these steps to set up and explore the  Authentication Server:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Bunty9/auth_server_ts.git
   ```
   Clone the repository to your local machine using the provided repository URL.

2. **Navigate to Server and Install Dependencies**:
   ```bash
   cd auth_server
   yarn
   ```
   Move into the `server` directory and install the required Node.js dependencies.
3. **Add Environment Variables**:
   ```bash
    .env.sample
   ```
   Rename the sample env and add appropriate variables.

4. **Launch the Server**:
   ```bash
   yarn run dev
   ```
   Start the server in development mode with hot-reloading. Run this command within the `server` directory. The server will be live at the specified port.

5. **Open Postman Collection**:
   ```bash
   authserver.postman_collection.json
   ```
   Load the postman collection in your postman and start testing the routes. Sample examples available in the collection



### Controllers

#### `user-controller.ts`

Express controller handling user registration, login, logout, activation, token refresh, and user data retrieval.

```ts
// src/controllers/user-controller.ts
import { Request,Response,NextFunction  } from "express";
import userService from "../service/user-service";
import { AuthenticatedRequest } from "../middleware/auth-middleware";
import { ApiError } from "../exceptions/api-error";

class UserController {
  // ... (controller code)
}

export default new UserController()
```

### DTOs

#### `user-dto.ts`

Data Transfer Object (DTO) for user data.

```ts
// src/dtos/user-dto.ts
export class UserDto {
  // ... (UserDto code)
};
```

### Exceptions

#### `api-error.ts`

Custom API error class for handling various error scenarios.

```ts
// src/exceptions/api-error.ts
export class ApiError extends Error {
  // ... (ApiError code)
};
```

### Middleware

#### `auth-middleware.ts`

Express middleware for validating and handling user authentication.

```ts
// src/middleware/auth-middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
import tokenService, {UserJwtPayload } from "../service/token-service";

export default function authMiddleware(){
    // ... (auth-middleware code)
}
```

#### `error-middleware.ts`

Express middleware for handling errors and returning appropriate responses.

```ts
// src/middleware/error-middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
export default function errorMiddleware(){
    // ... (error-middleware code)
}
```

### Models

#### `token-model.ts`

Mongoose model for storing refresh tokens.

```ts
// src/models/token-model.ts
import { Schema, model } from "mongoose";
const schema = new Schema<Token>({
// ... (token-model code)
})
export const TokenModel = model<Token>("Token", schema);
```

#### `user-model.ts`

Mongoose model for storing user data.

```ts
// src/models/user-model.ts
import { Document, Schema, model } from "mongoose";

// ... (user-model code)

export const UserModel = model<User>("User", schema);
```

### Router

#### `auth-routes.ts`

Express router defining routes for auth-related operations.

```ts
// src/router/auth-routes.ts
import { Router, Request, Response } from 'express'
import authController from '../controllers/auth-controller';
import authMiddleware from '../middleware/auth-middleware';

// ... (router code)
const authRouter = Router()

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export default authRouter;
```
#### `user-routes.ts`

Express router defining routes for user-related operations.Authenticated requests 

```ts
// src/router/auth-routes.ts
import { Router, Request, Response } from 'express'
import authMiddleware from '../middleware/auth-middleware';
import userController from '../controllers/user-controller';


// ... (router code)
const userRouter = Router()

userRouter.get('/getuser', authMiddleware, userController.getuser);

export default userRouter;
```

### Controller

#### `auth-controller.ts`

Controller to run services on routes.

```ts
// src/controllers/auth-controller.ts
import { Request,Response,NextFunction  } from "express";
import authService from "../service/auth-service";
import { ApiError } from "../exceptions/api-error";
import { loginValidation, signupValidation } from "../validators/auth-validator";
import { AuthenticatedRequest } from "../middleware/auth-middleware";

class AuthController{
    async signup(){}
    async login(){}
}

export default new AuthController();
```

### Services
#### `auth-service.ts`

Service for handling authentication, User creation, Email verification and Forgot Password

```ts
// src/service/auth-service.ts
import { UserModel } from "../models/user-model"
import { TokenModel } from "../models/token-model";
import mailService from "./mail-service";
import { UserDto } from "../dtos/user-dto";
import tokenService from "./token-service";

class AuthService {
    signup(){}
    login(){}
    verify(){}
    // ... (auth-service code)
}

export default new AuthService()
```

#### `mail-service.ts`

Service for sending activation emails using Nodemailer.

```ts
// src/service/mail-service.ts
import nodemailer, { Transporter } from "nodemailer";

class MailService {
    async sendActivationMail(){
        // ... (mail-service code)
    }
}
```

#### `token-service.ts`

Service for handling JWT tokens, including generation, validation, and storage.

```ts
// src/service/token-service.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenModel } from "../models/token-model";

class TokenService {
    generateTokens(){}
    saveToken(){}
    // ... (token-service code)
}

export default new TokenService()
```

#### `user-service.ts`

Service for user-related operations, including registration, activation, login, logout, token refresh, and user data retrieval.

```ts
// src/service/user-service.ts
import { UserDto } from "../dtos/user-dto";
import { UserModel } from "../models/user-model";

class UserService {
    async getuser(){}
    async updateuser(){}
    // ... (user-service code)
}


export default new UserService()
```
#### `db-service.ts`

Service for connecting to mongoDB. 

```ts
// src/service/db-service.ts
import mongoose from "mongoose";

export const startDb = async (): Promise<void> => {}
export const closeDb = async (): Promise<void> => {}

```

### Environment Configuration

#### `.env`

Environment configuration file containing various parameters, such as port, database URL, JWT secrets, SMTP settings, and API URLs.

```env
PORT = 5060
DB_URL = mongodb url
JWT_ACCESS_SECRET = access_secret
JWT_REFRESH_SECRET = refresh_secret
MAIL_SERVICE = gmail
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_USER = email_address
SMTP_PASSWORD = google_app_passwords
SERVER_API_URL = http://localhost:5060

```

### Server Initialization

####

 `index.ts`

Main server file that configures Express, connects to the MongoDB database, and starts the server.

```ts
// index.ts
require("dotenv").config();
import express from 'express';
import { startDb, closeDb } from './src/service/db-service';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 5000

const app = express();

// ... (index.ts code)

const startServer = async () => {
  // ... (startServer code)
};

startServer();
```

