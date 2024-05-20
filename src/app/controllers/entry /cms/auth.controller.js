const JwtToken = require("@Utils/jwt");
const RandStr = require("@Utils/string/random");
const PwdValidate = require("@Utils/string/password");
const { UserModel } = require("@Models/User/User");

module.exports = {
    ValidateToken: async (req, res) => {
        const validator = require("@")(req.query);
        if (!validator.stopOnFirstFailure().validate()) return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
            TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID,
            validator.errors().all()
        ));
        const { token } = req.query;
        try {
            const payload = JwtToken.VerifyToken(token);
            if (!payload) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
                TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID
            ));
            const user = await UserModel.findByID(payload.id);
            if (!user) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
                TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID
            ));
            const userDocument = user.toJSON();
            delete userDocument.password;
            return res.status(200).json(RESP_DATA.SUCCESS(userDocument));
        } catch (err) {
            console.log(err);
            return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH.TOKEN_INVALID,
                TEXT_ENUM.ERROR_AUTH.TOKEN_INVALID
            ));
        }
    },
    LoginAccount: async (req, res) => {
        const validator = require("@")(req.body);
        if (!validator.stopOnFirstFailure().validate()) return res.status(400).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_FORM.INVALID_FIELD,
            TEXT_ENUM.ERROR_FORM.INVALID_FIELD,
            validator.errors().all()
        ));

        try {
            const { username, password } = req.body;
            const user = await UserModel.findByUsername(username);

            if (!user) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH.LOGIN_FAIL,
                TEXT_ENUM.ERROR_AUTH.LOGIN_FAIL
            ));

            if (!PwdValidate.validatePassword(password, user.password)) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH.LOGIN_FAIL,
                TEXT_ENUM.ERROR_AUTH.LOGIN_FAIL
            ));

            const userDocument = user.toJSON();
            delete userDocument.password;

            return res.status(200).json(
                RESP_DATA.SUCCESS({
                    user: userDocument,
                    access_token: await JwtToken.CreateToken(userDocument)
                })
            );
        } catch (e) {
            console.log(e);
            return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_SERVER.WRONG,
                TEXT_ENUM.ERROR_CODES.SomeErrorsOccurredPleaseTryAgain
            ));
        }
    },
    RegisterAccount: async (req, res) => {
        const validator = require("@")(req.body);
        if (!validator.stopOnFirstFailure().validate()) return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_FORM.INVALID_FIELD,
            TEXT_ENUM.ERROR_FORM.INVALID_FIELD,
            validator.errors().all()
        ));

        try {
            const user = req.body;

            // check exist account same username
            if (await UserModel.findByUsername(user.username)) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH_MESSAGE.UsernameExists,
                TEXT_ENUM.ERROR_AUTH_MESSAGE.UsernameExists
            ));
            // check exist account same phone
            if (await UserModel.findByPhoneNumber(user.phone)) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH_MESSAGE.PhoneExists,
                TEXT_ENUM.ERROR_AUTH_MESSAGE.PhoneExists
            ));
            // check exist account same email
            if (await UserModel.findByEmail(user.email)) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_AUTH_MESSAGE.EmailExists,
                TEXT_ENUM.ERROR_AUTH_MESSAGE.EmailExists
            ));

            // đăng kí tài khoản
            user.name = user.name;
            user.username = user.username;
            user.phone = user.phone;
            user.status = UserModel.STATUS_ENUM.ACTIVE;
            user.role = UserModel.ROLE_ENUM.USER;
            user.balance = 0;
            user.password = PwdValidate.generatePassword(user.password);
            user.code = RandStr.randomString(6);
            user.verify = UserModel.VERIFY_ENUM.FALSE;
            const userSaved = await UserModel.create(user);
            //sendUseregister(userSaved.email, userSaved.code);
            await userSaved.reload();
            const userDocument = userSaved.toJSON();
            userDocument.verify = JSON.parse(userDocument.verify);
            delete userDocument.code;
            delete userDocument.password;
            delete userDocument.deletedAt;

            return res.status(200).json(
                RESP_DATA.SUCCESS({
                    user: userDocument,
                    access_token: await JwtToken.CreateToken(userDocument)
                })
            );

        } catch (e) {
            console.log(e);
            return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_SERVER.WRONG,
                TEXT_ENUM.ERROR_CODES.SomeErrorsOccurredPleaseTryAgain
            ));
        }
    },
}