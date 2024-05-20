const sequelize = require("@Databases/mysql");
const { Model, DataTypes } = require("sequelize");

class AppRoleListModel extends Model {

    /*** TABLE NAME ***/
    static TABLE_NAME = "App_Role_List";

    static scopes = {};
}


const Entity = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_permisstions_id: {
        type: DataTypes.INTEGER,
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


AppRoleListModel.init(Entity, {
    paranoid: true,
    indexes: [{
        unique: true, 
        fields: [
            "role_name"
        ]
    }],
    tableName: AppRoleListModel.TABLE_NAME,
    updatedAt: "updatedAt",
    createdAt: "createdAt",
    deletedAt: "deletedAt",
    scopes: AppRoleListModel.scopes,
    sequelize
});

module.exports = { AppRoleListModel };
