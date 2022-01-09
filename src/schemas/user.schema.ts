import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password must be at least 6 characters"),
        confirmPassword: string({
            required_error: "Confirm Password is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Enter a valid email")
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;