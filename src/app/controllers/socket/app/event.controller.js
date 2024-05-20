const redis = require("@Databases/redis");

module.exports = (ws, req) => {
    // console.log(MAIN_SOCKET.clients);

    ws.getUniqueID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };
    ws.id = ws.getUniqueID();
    ws.red = (data) => { ws.send(JSON.stringify(data)); };

    MAIN_SOCKET.users.push(ws);
    console.log("conn: " + ws.id);

    ws.on('message', function (data) {
        const message = JSON.parse(data);
        if (void 0 !== message.event && void 0 !== message.data) {

            if (message.event == "publish") {
                ws.red({ ok: true, message });
            }

            if (message.event == "test") {
                MAIN_SOCKET.sendToClient(message.data.clientId, {
                    message: message.data.message
                });
            }

        } else {
            ws.red({ ok: false, message: "Error data!" });
        }
    });

    ws.on('close', function (data) {
        console.log("connect closed");

        MAIN_SOCKET.users = MAIN_SOCKET.users.filter((check) => {
            return check.id != ws.id
        });
        console.log(MAIN_SOCKET.users)

    });
};