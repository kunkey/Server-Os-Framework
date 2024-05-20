

module.exports = (ws, app) => {
    require("./dbConnection");
    require("@Utils/errorHandle");
    require("./webSocket")(ws);
    require("./globalVariables")(ws, app);
};