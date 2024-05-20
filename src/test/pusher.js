const pusher = require("../app/libs/Pusher");


setInterval(() => {
    pusher.trigger("channel", "channel-event", {
        message: "heluu"
    }).then(console.log).catch(e => console.log(e))
}, 5000);