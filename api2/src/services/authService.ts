import { Repository } from "../repositories/authRepository";

const jwt = require("jsonwebtoken");

async function login(user_id: string, password: string) {
    const loggedInUser = await Repository.findUnique(user_id, password);

    if (!loggedInUser) throw new Error("Authorization failed!");

    try {
        if (loggedInUser && "user_id" in loggedInUser) {
            const token = jwt.sign(
                { userId: String(loggedInUser.user_id), email: loggedInUser.password },
                "SECRET_KEY",
                { expiresIn: "2000000000" }
            );
            return token;
        } else {
            throw new Error("invalid user data");
        }
    } catch {
        throw new Error("Token generation failed!");
    }
}

async function register(user_id: string, password: string) {
    const result = await Repository.register(user_id, password);
    return result;
}

export {
    login,
    register
}
