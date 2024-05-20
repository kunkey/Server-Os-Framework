require("module-alias/register");

class Bootstrap {
    constructor() {
        /**
        * Start Express Server.
        */
        require("@Express");

        /**
        * Start Pub/Sub Websocket.
        */
        require("@WebSocket");        
    }
}

new Bootstrap();