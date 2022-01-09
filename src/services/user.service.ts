import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";

export type ValidatableUser = { email: string, password: string };

export const createUser = async (data: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>) => {
    try {
        const result = await User.create(data);
        const { password, ...user } = result.toJSON();
        return user
    }
    catch (e: any) {
        throw new Error(e);
    }
};

export const findUser = (query: FilterQuery<UserDocument>) => {
    return User.findOne(query).lean();
}

export const validatePassword = async ({ email, password: _password }: ValidatableUser) => {
    const user = await User.findOne({ email });

    if (!user) {
        return false;
    }

    const valid: boolean = await user.comparePassword(_password);
    if (!valid) return false;

    const {password, ...ommitedUser} = user.toJSON()
    return ommitedUser;
}