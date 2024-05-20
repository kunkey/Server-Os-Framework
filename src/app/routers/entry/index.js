const router = require("express").Router();

/*****  App Entry Webhook Routers   *****/
router.use("/", require("@Routers/entry/app"));
router.use("/cms", require("@Routers/entry/cms"));

module.exports = router;
