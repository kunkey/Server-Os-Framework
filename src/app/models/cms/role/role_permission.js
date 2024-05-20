const sequelize = require("@Databases/mysql");
const { Model, DataTypes } = require("sequelize");

class CmsRolePermissionModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "Cms_Role_Permission";

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


CmsRolePermissionModel.init(Entity, {
    paranoid: true,
    // indexes: [{
    //     unique: true, 
    //     fields: [
    //         "role_name"
    //     ]
    // }],
    tableName: CmsRolePermissionModel.TABLE_NAME,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    scopes: CmsRolePermissionModel.scopes,
    sequelize
});

module.exports = { CmsRolePermissionModel };
