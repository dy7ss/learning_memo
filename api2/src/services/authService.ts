import { Repository } from "../repositories/authRepository";

const jwt = require("jsonwebtoken");

async function login(body: any) {
    const { email, password } = body;
    const loggedInUser = await Repository.findUnique(email, password);

    if (!loggedInUser) throw new Error("Authorization failed!");

    try {
        if (loggedInUser && "user_id" in loggedInUser) {
            const token = jwt.sign(
                { userId: String(loggedInUser.user_id), email: loggedInUser.password },
                // { userId: "123", email: "123" },
                "SECRET_KEY",
                { expiresIn: "2000000000" } // 10minutes
            );
            return token;
        } else {
            throw new Error("invalid user data");
        }
    } catch {
        throw new Error("Token generation failed!");
    }
}

export {
    login
}
