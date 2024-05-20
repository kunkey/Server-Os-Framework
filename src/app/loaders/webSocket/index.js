module.exports = (websocket) => {
    require("./app")(websocket);
    require("./cms")(websocket);
    require("./agent")(websocket);
};