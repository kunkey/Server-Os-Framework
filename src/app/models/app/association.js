const { AppUserModel } = require("./user/user.model");
const { AppRoleListModel } = require("./role/role_list.model");
const { AppRolePermissionModel } = require("./role/role_permission");


AppUserModel.belongsTo(AppRoleListModel, {
    as: "AppRole",
    foreignKey: "role"
});

AppRolePermissionModel.hasMany(AppRoleListModel, {
    as: "AppRolePermissionAllow",
    foreignKey: "role_permisstions_id"
});

// AppRoleListModel.belongsTo(AppRolePermissionModel, {
//     as: "AppRole",
//     foreignKey: "id"
// });

