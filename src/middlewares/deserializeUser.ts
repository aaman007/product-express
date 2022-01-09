import { Request, Response, NextFunction } from "express";
import { reIssueAccessToken } from "../services/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers?.authorization || "").replace(/^Bearer\s/, "");
    const refreshToken = req.headers["x-refresh"] as string;
    if (!accessToken) {
        return next();
    }
    
    const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");
    if (decoded && !expired) {        
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {        
        const newAccessToken = await reIssueAccessToken(refreshToken) as string;
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        const { decoded } = verifyJwt(newAccessToken, "accessTokenPublicKey");
        res.locals.user = decoded;
        
        return next();
    }
    return next();
};

export default deserializeUser;