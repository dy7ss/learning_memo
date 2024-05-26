const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = class AuthService {
    async login(body: any) {
        const { email, password } = body;
        // const loggedInUser = await User.findOne({
        //     where: {
        //         email,
        //         password,
        //     },
        // });
        const loggedInUser = { id: "123", email: "example.com" }

        console.log("loggedInUser", loggedInUser)


        if (!loggedInUser) throw new Error("Authorization failed!");

        try {
            const token = jwt.sign(
                { userId: loggedInUser.id, email: loggedInUser.email },
                "SECRET_KEY",
                { expiresIn: "2000000000" } // 10minutes
            );
            return token;
        } catch {
            throw new Error("Token generation failed!");
        }
    }

    async signUp() { }
};
