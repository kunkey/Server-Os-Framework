const requestIP = require("ip");

const expressHeaderClientIp = function (req, res, next) {
    req.headers['clientIp'] = requestIP.address();
    next();
};

module.exports = {
    expressHeaderClientIp
}