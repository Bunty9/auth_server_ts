import mongoose from "mongoose";


export const startDb = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string, {});
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit process with failure code
    }
};

// Function to close the database connection
export const closeDb = async (): Promise<void> => {
    try {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    } catch (error) {
        console.error("Error closing the database connection:", error);
    }
};