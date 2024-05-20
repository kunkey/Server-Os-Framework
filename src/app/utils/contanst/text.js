const assert = require("assert");
const LANGUAGE = require("@Configs/lang").language;

assert(LANGUAGE, "LANGUAGE configuration is required. Please set language in config lang.js file!");

const languagePath = require("path").join(__dirname, `lang/${LANGUAGE}.js`);

if (!require("fs").existsSync(languagePath)) {
    throw new Error(`Err: Language file for '${LANGUAGE}' not exists! Please check your configuration!`);
}

module.exports = require(languagePath);