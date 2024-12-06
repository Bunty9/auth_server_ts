require("dotenv").config();
import express from 'express';
import { startDb, closeDb } from './src/service/db-service';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 5000

//routes
import publicRouter from './src/router/public-routes';
import authRouter from './src/router/auth-routes';
import userRouter from './src/router/user-routes';


const app = express();

app.use(cookieParser());

app.use(express.json());


// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
app.use(
    cors({
        origin: "*", // Allow all origins (for development only, restrict in production)
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);

//routes
app.use('/api/public',publicRouter)
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
//start server

const startServer = async () => {
    try {
        // Start the database connection
        await startDb();

        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`);
        });

        // Graceful shutdown
        process.on("SIGINT", async () => {
            console.log("\nShutting down gracefully...");
            await closeDb(); // Close the database connection
            server.close(() => {
                console.log("Server closed.");
                process.exit(0);
            });
        });

        process.on("SIGTERM", async () => {
            console.log("\nShutting down gracefully...");
            await closeDb(); // Close the database connection
            server.close(() => {
                console.log("Server closed.");
                process.exit(0);
            });
        });

    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1); // Exit with failure
    }
}

startServer()