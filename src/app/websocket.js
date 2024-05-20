const redis = require("@Databases/redis");

// init variables object has function handle event
const SOCKET_EVENT_CONTROLLER = {};

/*** sent to a client that has been assigned a specific UID ***/
SOCKET_EVENT_CONTROLLER[SOCKET_MESSAGE_EVENT.SEND_TO_CLIENT_ID] = function (data) {
    const { clientId, message } = data;
    MAIN_SOCKET.users.forEach((client) => {
        if (client && client.red && client.id == clientId) client.red(message);
    });
}

redis.Instance[1].subscribe(WEBSOCKET_CHANNEL.APP, (data, channel) => {
    try {
        const message = redis.decode(data);
        if (void 0 !== message.event && void 0 !== message.data) SOCKET_EVENT_CONTROLLER[message.event](message.data);
    } catch (e) {
        console.log(e);
    }
});