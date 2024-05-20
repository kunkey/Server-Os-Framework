const sequelize = require("@Databases/mysql");
const { Model, DataTypes } = require("sequelize");
const PwdValidate = require("@Utils/string/password");
// const { AgencyModel } = require("@Models/Agency/Agency");
// const { BankUserModel } = require("@Models/Bank/BankUser");

class AppUserModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "App_User";

    static STATUS_ENUM = {
        ACTIVE: "active",
        PENDING: "pending",
        BLOCKED: "blocked"
    };
    static VERIFY_ENUM = {
        TRUE: true,
        FALSE: false
    };

    static scopes = {
        // withAgencyInfo() {
        //     return {
        //         include: [
        //             {
        //                 model: AgencyModel,
        //                 as: "AgencyInfo"
        //             }
        //         ]
        //     }
        // },
        // withRoleAgency() {
        //     return {
        //         where: { role: UserModel.ROLE_ENUM.AGENCY }
        //     }
        // },
        // withRoleUser() {
        //     return {
        //         where: { role: UserModel.ROLE_ENUM.USER }
        //     }
        // },
        // withBankUser() {
        //     return {
        //         include: [
        //             {
        //                 model: BankUserModel,
        //                 as: "BankUser",
        //                 //attributes: { exclude: ["password", "deletedAt", "code", "role", "updatedAt"] },
        //             },
        //         ]
        //     }
        // },
        // byAgencyCode(code) {
        //     return {
        //         include: [
        //             {
        //                 model: AgencyModel,
        //                 as: "AgencyInfo",
        //                 where: { code }
        //             }
        //         ]
        //     }
        // },
    }
}

const Entity = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue("password");
        },
        set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('password', PwdValidate.generatePassword(value));
        },
    },
    role: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM({
            values: Object.values(AppUserModel.STATUS_ENUM)
        }),
        defaultValue: AppUserModel.STATUS_ENUM.ACTIVE
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: AppUserModel.VERIFY_ENUM.FALSE
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    deletedAt: {
        type: DataTypes.DATE
    }
};


AppUserModel.init(Entity, {
    paranoid: true,
    indexes: [{
        unique: true, 
        fields: [
            "username",
            "email",
            "phone"
        ]
    }],
    tableName: AppUserModel.TABLE_NAME,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    scopes: AppUserModel.scopes,
    sequelize
});

AppUserModel.findByUsername = async (username) => {
    const user = await AppUserModel.findOne({
        where: { username }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};

AppUserModel.findByEmail = async (email) => {
    const user = await AppUserModel.findOne({
        where: { email }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};

AppUserModel.findByID = async (userId) => {
    const user = await AppUserModel.findOne({
        where: {
            id: userId
            // status: AppUserModel.STATUS_ENUM.ACTIVE
        }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};

AppUserModel.findByPhoneNumber = async (PhoneNumber) => {
    const user = await AppUserModel.findOne({
        where: { phone: PhoneNumber }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};


module.exports = { AppUserModel };
