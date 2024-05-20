"use strict";

const dotenv = require("dotenv");
const assert = require("assert");
const path = require("path");

// environment file error should crash whole process
const isEnvFound = dotenv.config({ path: path.resolve(".env") });
if (isEnvFound.error) {
	throw new Error("Cannot find .env file!");
}

const {
	ENV_ENVIROMENT,
	SERVER_PORT,
	JWT_SCRET_KEY,
	JWT_EXPIRES_IN,
	APP_SECRET_KEY,
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_DATABASE,
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	// RABBITMQ_HOST,
	// RABBITMQ_PORT,
	// RABBITMQ_USERNAME,
	// RABBITMQ_PASSWORD
} = process.env;

assert(ENV_ENVIROMENT, "ENV_ENVIROMENT configuration is required.");
assert(SERVER_PORT, "PORT configuration is required.");
assert(JWT_SCRET_KEY, "JWT_SCRET_KEY configuration is required.");
assert(JWT_EXPIRES_IN, "JWT_EXPIRES_IN configuration is required.");
assert(APP_SECRET_KEY, "APP_SECRET_KEY configuration is required.");
assert(MYSQL_HOST, "MYSQL_HOST configuration is required.");
assert(MYSQL_PORT, "MYSQL_PORT configuration is required.");
assert(MYSQL_USERNAME, "MYSQL_USERNAME configuration is required.");
assert(MYSQL_PASSWORD, "MYSQL_PASSWORD configuration is required.");
assert(MYSQL_DATABASE, "MYSQL_DATABASE configuration is required.");
assert(REDIS_HOST, "REDIS_HOST configuration is required.");
assert(REDIS_PORT, "REDIS_PORT configuration is required.");
assert(REDIS_PASSWORD, "REDIS_PASSWORD configuration is required.");
// assert(RABBITMQ_HOST, "RABBITMQ_HOST configuration is required.");
// assert(RABBITMQ_PORT, "RABBITMQ_PORT configuration is required.");
// assert(RABBITMQ_USERNAME, "RABBITMQ_USERNAME configuration is required.");
// assert(RABBITMQ_PASSWORD, "RABBITMQ_PASSWORD configuration is required.");

// module.exports = process.env; // for develop mode

module.exports = {
	ENV_ENVIROMENT,
	SERVER_PORT,
	JWT_SCRET_KEY,
	JWT_EXPIRES_IN,
	APP_SECRET_KEY,
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_DATABASE,
	MYSQL_USERNAME,
	MYSQL_PASSWORD,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	// RABBITMQ_HOST,
	// RABBITMQ_PORT,
	// RABBITMQ_USERNAME,
	// RABBITMQ_PASSWORD
}; // for production mode