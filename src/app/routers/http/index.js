const router = require("express").Router();


/*****  HTTP ROUTERS   *****/
// App Router
router.use("/", require("@Routers/http/app"));
// Cms Router
router.use("/cms", require("@Routers/http/cms"));


module.exports = router;
