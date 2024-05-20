"use strict";

const Sequelize = require("sequelize");

const {
    ENV_ENVIROMENT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD
} = require("@Configs/env");

const connection = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    {
        host: MYSQL_HOST,
        port: parseInt(MYSQL_PORT),
        dialect: "mysql",
        dialectOptions: {
            connectTimeout: 30000
        },
        pool: {
            max: 100,
            min: 1,
            acquire: 30000,
            idle: 3600000
        },
        timezone: "+07:00",
        logging: (str) => (ENV_ENVIROMENT == "develop") ? console.log(str) : null,
        logQueryParameters: true,
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true
        }
    }
);

module.exports = connection;
