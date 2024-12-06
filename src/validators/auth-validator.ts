import { z } from "zod";

export const signupValidation = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(4, "Password must be at least 4 characters long").max(20, "Password cannot exceed 20 characters"),
    confirmpassword: z.string().min(4, "Confirm password must be at least 4 characters long").max(20, "Confirm password cannot exceed 20 characters"),
});


export const loginValidation = z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(4, "Password must be at least 4 characters long").max(20, "Password cannot exceed 20 characters"),
})

