const sequelize = require("@Databases/mysql");
const { Model, DataTypes } = require("sequelize");

class AppRolePermissionModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "App_Role_Permission";

    static scopes = {};
}


const Entity = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permission_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions_allow: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue("permissions_allow"));
        },
        set: function (value) {
            return this.setDataValue("permissions_allow", JSON.stringify(value));
        },
        defaultValue: {},
        allowNull: false
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


AppRolePermissionModel.init(Entity, {
    paranoid: true,
    // indexes: [{
    //     unique: true, 
    //     fields: [
    //         "role_name"
    //     ]
    // }],
    tableName: AppRolePermissionModel.TABLE_NAME,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    scopes: AppRolePermissionModel.scopes,
    sequelize
});

module.exports = { AppRolePermissionModel };
