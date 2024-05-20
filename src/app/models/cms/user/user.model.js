const sequelize = require("@Databases/mysql");
const { Model, DataTypes } = require("sequelize");
const PwdValidate = require("@Utils/string/password");

class CmsUserModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "Cms_User";

    static STATUS_ENUM = {
        ACTIVE: "active",
        PENDING: "pending",
        BLOCKED: "blocked"
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
    status: {
        type: DataTypes.ENUM({
            values: Object.values(CmsUserModel.STATUS_ENUM)
        }),
        defaultValue: CmsUserModel.STATUS_ENUM.ACTIVE
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


CmsUserModel.init(Entity, {
    paranoid: true,
    indexes: [{
        unique: true, 
        fields: [
            "username",
            "email",
            "phone"
        ]
    }],
    tableName: CmsUserModel.TABLE_NAME,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    scopes: CmsUserModel.scopes,
    sequelize
});

CmsUserModel.findByUsername = async (username) => {
    const user = await CmsUserModel.findOne({
        where: { username }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};

CmsUserModel.findByEmail = async (email) => {
    const user = await CmsUserModel.findOne({
        where: { email }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};

CmsUserModel.findByID = async (userId) => {
    const user = await CmsUserModel.findOne({
        where: {
            id: userId
            // status: CmsUserModel.STATUS_ENUM.ACTIVE
        }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};

CmsUserModel.findByPhoneNumber = async (PhoneNumber) => {
    const user = await CmsUserModel.findOne({
        where: { phone: PhoneNumber }
    });
    if (user == null) {
        return null;
    } else {
        return user;
    }
};


module.exports = { CmsUserModel };
