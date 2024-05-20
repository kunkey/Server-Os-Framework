const jwt = require('jsonwebtoken');
const { JWT_SCRET_KEY, JWT_EXPIRES_IN } = require("@Configs/env");

module.exports = {
    CreateToken: (payload) => {
        try {
            return jwt.sign(payload, JWT_SCRET_KEY, {
                expiresIn: JWT_EXPIRES_IN
            });;
        } catch (err) {
            return false;
        }
    },
    VerifyToken: (token) => {
        return jwt.verify(token, JWT_SCRET_KEY);
    }
}