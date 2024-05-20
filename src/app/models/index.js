const sequelize = require("@Databases/mysql");
const env = require("@Configs/env");

// Initialize App Model Association
require("@Models/app/association");

// Initialize Cms Model Association
require("@Models/cms/association");


const InitializeConnection = sequelize.sync({
    // force: true, // Thao tác này sẽ xóa bảng trước nếu nó đã tồn tại và tạo lại bảng
    alter: true, // Thao tác này thực hiện những thay đổi cần thiết trong bảng để làm cho nó khớp với mô hình
    logging: (env.ENV_ENVIROMENT == "develop") ? true : false
});

module.exports = InitializeConnection;