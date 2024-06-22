import { Router, Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

module.exports = async function verifyAccessToken(request: Request, response: Response, next: NextFunction) {
    const token = request?.headers?.authorization;
    if (!token) response.status(401).send("Token must be provided!");

    try {
        const decodedToken = jwt.verify(token, "SECRET_KEY");
        console.debug(decodedToken);
        next();
    } catch {
        response.status(401).send("Authorization failed2!");
    }
};
