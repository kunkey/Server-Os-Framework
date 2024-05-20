

module.exports = (ws, req) => {
    console.log("connection connected cms");
    setInterval(() => {
        ws.send("ok");
    }, 200);
    ws.on('message', function (msg) {
        ws.send(msg);
        console.log("message sent");
    });
};