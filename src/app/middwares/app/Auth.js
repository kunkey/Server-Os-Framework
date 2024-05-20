const JwtToken = require("@Utils/jwt");
const { AppUserModel } = require("@Models/app/user/user.model");
const { APP_SECRET_KEY } = require("@Configs/env");

module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const validator = require("@Middwares/app/params/auth/validate_token")({ token });
        if (!validator.stopOnFirstFailure().validate()) return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
            TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID,
            validator.errors().all()
        ));

        const payload = JwtToken.VerifyToken(token);
        if (!payload) return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
            TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID
        ));
        const user = await AppUserModel.findByID(payload.id);
        if (!user) return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
            TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID
        ));

        // Set User Model To Request 
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
            TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID
        ));
    }
}