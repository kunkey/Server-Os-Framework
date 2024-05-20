const redis = require("@Databases/redis");

module.exports = (ws) => {
    /*** Init varibles to save users authorized ***/
    ws.users = [];
    ws.agents = [];
    ws.admins = [];

    /*** UTILS FUNCTIONS ***/
    ws.sendToClient = (clientId, message) => {
        redis.Instance[0].publish(WEBSOCKET_CHANNEL.APP, redis.encode({
            event: SOCKET_MESSAGE_EVENT.SEND_TO_CLIENT_ID,
            data: {
                clientId,
                message
            }
        }));
    };
};