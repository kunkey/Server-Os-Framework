module.exports = (ws, app) => {
    global.MAIN_SOCKET = ws;
    global.WEBSOCKET_CHANNEL = {
        APP: "server-app-channel",
        AGENT: "server-agent-channel",
        CMS: "server-cms-channel"
    };
    global.SOCKET_MESSAGE_EVENT = require("@Utils/contanst/socket");
    global.LOGGER = require("@Utils/logger").loggerConsole;
    global.ERRSOLE = require("@Utils/errsole");
    global.TEXT_ENUM = require("@Utils/contanst/text");
    global.CODE_ENUM = require("@Utils/contanst/code");
    global.RESP_DATA = require("@Utils/response");
}