/****
 * Docs here: https://github.com/errsole/errsole.js/blob/master/docs/mysql-storage.md
 */

const {
    ENV_ENVIROMENT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD
} = require("@Configs/env");

module.exports = {
      dialect: 'mysql',
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT),
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    //   collectLogs: ['error', 'info'],
    //   enableConsoleOutput: true,
    // exitOnException: true,
    //   appName: "",
      environmentName: ENV_ENVIROMENT,
    //   serverName: ENV_ENVIROMENT
};