import { object, string } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Enter a valid email"),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password must be at least 6 characters")
    })
});