/***
 * WebSocket namespace here 
*/

/*****  WEBSOCKET ROUTERS   *****/

module.exports = function (app) {
    /*****  APP ROUTER   *****/
    app.ws('/', (ws, req) => require("@Controllers/socket/app/event.controller")(ws, req));
    /*****  AGENT ROUTER   *****/
    app.ws('/agent', (ws, req) => require("@Controllers/socket/agent/event.controller")(ws, req));
    /*****  CMS ROUTER   *****/
    app.ws('/cms', (ws, req) => require("@Controllers/socket/cms/event.controller")(ws, req));
};