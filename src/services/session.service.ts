import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model"
import { findUser } from "./user.service";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import config from "config";
import _ from "lodash";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
};

export const findSessions = (query: FilterQuery<SessionDocument>) => {
    return Session.find(query).lean();
};

export const updateSession = (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
    return Session.updateOne(query, update);
};

export const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
    if (!decoded || !_.get(decoded, "session")) {
        return false;
    }

    const session = await Session.findById(_.get(decoded, "session"));
    if (!session || !session.valid) {
        return false;
    }

    const user = await findUser({ _id: session.user });
    console.log(user, session)
    if (!user) {
        return false;
    }

    const accessToken = signJwt(
        { ...user, session: session._id },
        "accessTokenPrivateKey",
        { expiresIn: config.get<string>("accessTokenTTL") }
    );
    
    return accessToken;
}