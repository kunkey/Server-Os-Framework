const Pusher = require("pusher");
// const PusherConfig = require("@Configs/lib/pusher/config");
const PusherConfig = require("../../configs/lib/pusher/config");

module.exports = new Pusher({
    appId: PusherConfig.APP_ID,
    key: PusherConfig.KEY,
    secret: PusherConfig.SECRET,
    cluster: PusherConfig.CLUSTER,
    useTLS: true
});