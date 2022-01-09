import { Request, Response } from "express";
import config from "config";
import { createSession, findSessions, updateSession } from "../services/session.service"
import { validatePassword } from "../services/user.service"
import { signJwt } from "../utils/jwt.utils";

export const createSessionHandler = async (req: Request, res: Response) => {
    // Validate Password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Create an access token
    const accessToken = signJwt({
        ...user, session: session._id
    }, "accessTokenPrivateKey", { expiresIn: config.get<string>("accessTokenTTL") });

    // Create a refresh token
    const refreshToken = signJwt({
        ...user, session: session._id
    }, "refreshTokenPrivateKey", { expiresIn: config.get<string>("refreshTokenTTL") });

    // Return access and refresh tokens
    return res.status(200).send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;
    console.log(res.locals.user)
    const sessions = await findSessions({user: userId, valid: true});
    return res.status(200).send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });

    return res.status(200).send({ 
        accessToken: null,
        refreshToken: null
    })
}