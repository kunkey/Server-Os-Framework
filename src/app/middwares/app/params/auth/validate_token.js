const { make } = require("simple-body-validator");

module.exports = function (params) {
    return make(params, {
        token: ['required', 'string', 'min:10']
    });
};