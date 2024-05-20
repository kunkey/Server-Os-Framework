const { CmsUserModel } = require("./user/user.model");
const { CmsRoleListModel } = require("./role/role_list.model");
const { CmsRolePermissionModel } = require("./role/role_permission");


CmsUserModel.belongsTo(CmsRoleListModel, {
    as: "CmsRole",
    foreignKey: "role"
});

CmsRolePermissionModel.hasMany(CmsRoleListModel, {
    as: "CmsRolePermissionAllow",
    foreignKey: "role_permisstions_id"
});

// CmsRoleListModel.belongsTo(CmsRolePermissionModel, {
//     as: "CmsRole",
//     foreignKey: "id"
// });

