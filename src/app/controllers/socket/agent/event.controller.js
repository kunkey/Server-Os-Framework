

module.exports = (ws, req) => {
    console.log("connection connected agent");
    setInterval(() => {
        ws.send("ok");
    }, 200);
    ws.on('message', function (msg) {
        ws.send(msg);
        console.log("message sent");
    });
};