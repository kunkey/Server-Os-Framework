const md5 = require('md5');

module.exports = {
    generatePassword: (password) => {
        return md5(password);
    },
    validatePassword: (password, hashedPass) => {
        return (md5(password) === hashedPass);
    },
    randomPassword: (length) => {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
}