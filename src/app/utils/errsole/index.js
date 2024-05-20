/****
 * Docs here: https://github.com/errsole/errsole.js/blob/master/docs/mysql-storage.md
 */

"use strict";

const errsole = require("errsole");
const ErrsoleSequelize = require("errsole-sequelize");

// Insert the Errsole code snippet at the beginning of your app's main file
errsole.initialize({
    storage: new ErrsoleSequelize(require("@Configs/lib/errsole/config"))
});

module.exports = errsole;