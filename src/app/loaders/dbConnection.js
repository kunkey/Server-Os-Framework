const Sequelize = require("sequelize");
const InitDatabaseConnection = require("@Models");

InitDatabaseConnection
    .then((conn) => {
        console.log('\x1b[32m%s\x1b[0m', ">>> Connected MySql Database!");

        // if is root user
        // Conn.query(`SET @@global.sql_mode='MYSQL40'`, { type: Sequelize.QueryTypes.RAW });
    })
    .catch((errConn) => console.error(">>> Connect MySql Database Error: ", errConn));

module.exports = InitDatabaseConnection;
