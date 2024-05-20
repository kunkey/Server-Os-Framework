
const { AppUserModel } = require("@Models/app/user/user.model");
const { strToInt } = require("@Utils/string/number");


module.exports = {
    GetAllUsers: async (req, res) => {
        try {
            const validator = require("@Middwares/app/params/user/validate_get_all_user")(req.query);
            if (!validator.stopOnFirstFailure().validate()) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_FORM.INVALID_FIELD,
                TEXT_ENUM.ERROR_FORM.INVALID_FIELD,
                validator.errors().all()
            ));

            // set default page number & limit record on page
            const page = strToInt(req.query.page, true) ? strToInt(req.query.page, true) : 1;
            const limit = strToInt(req.query.limit, true) ? strToInt(req.query.limit, true) : 10;
            const sort = (req.query.sort) ? req.query.sort.toUpperCase() : "DESC";

            let match = {};
            let assocScopes = [];
            let distinct = false;

            if (!!req.query.name) match.name = req.query.name;
            if (!!req.query.username) match.username = req.query.username;
            if (!!req.query.phone) match.phone = req.query.phone;
            if (!!req.query.email) match.email = req.query.email;

            const total = await AppUserModel.count({ where: match, distinct });
            let getUsers = await AppUserModel.scope(assocScopes).findAll({
                where: match,
                offset: 0 + (page - 1) * limit,
                limit: limit,
                order: [["id", sort]],
                attributes: { exclude: ["password", "role", "deletedAt"] },
                distinct
            });

            return res.status(200).json(
                RESP_DATA.SUCCESS({
                    result: getUsers,
                    page,
                    limit,
                    total
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
    UserInfo: async (req, res) => {
        const validator = require("@Middwares/app/params/user/validate_user_info")(req.params);
        if (!validator.stopOnFirstFailure().validate()) return res.status(200).json(RESP_DATA.ERROR(
            CODE_ENUM.ERROR_FORM.INVALID_FIELD,
            TEXT_ENUM.ERROR_FORM.INVALID_FIELD,
            validator.errors().all()
        ));

        try {
            const { id } = req.params;
            const user = await AppUserModel.findOne({
                where: { id },
                attributes: { exclude: ["password", "role", "deletedAt"] }
            });
            if (!user) return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_CODES.AccountNotFound,
                TEXT_ENUM.ERROR_CODES.AccountNotFound
            ));
            return res.status(200).json(
                RESP_DATA.SUCCESS(user)
            );
        } catch (e) {
            console.log(e);
            return res.status(200).json(RESP_DATA.ERROR(
                CODE_ENUM.ERROR_SERVER.WRONG,
                TEXT_ENUM.ERROR_CODES.SomeErrorsOccurredPleaseTryAgain
            ));
        }
    },
    UserAction: {
        UpdateInfo: async (req, res) => {
            try {

            } catch (e) {
                console.log(e);
                return res.status(200).json(RESP_DATA.ERROR(
                    CODE_ENUM.ERROR_SERVER.WRONG,
                    TEXT_ENUM.ERROR_CODES.SomeErrorsOccurredPleaseTryAgain
                ));
            }
        },
        Delete: async (req, res) => {
            try {

            } catch (e) {
                console.log(e);
                return res.status(200).json(RESP_DATA.ERROR(
                    CODE_ENUM.ERROR_SERVER.WRONG,
                    TEXT_ENUM.ERROR_CODES.SomeErrorsOccurredPleaseTryAgain
                ));
            }
        },
    }
};