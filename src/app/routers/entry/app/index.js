const router = require("express").Router();
// const middleware = require("@Middwares/app/Auth");

router.use("/", require("./main.router"));
// router.use("/auth", require("./auth.router"));
// router.use("/user", middleware, require("./user.router"));

module.exports = router;
