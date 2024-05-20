const router = require("express").Router();

/*****  HTTP ROUTERS   *****/
// App & Cms Router
router.use("/", require("@Routers/http/index"));

// Entry Router
router.use("/entry", require("@Routers/entry/index"));

// Router not found
router.get("*", (req, res, next) => {
    res.status(404).json(RESP_DATA.ERROR(CODE_ENUM.ERROR_PAGE.NOT_FOUND, TEXT_ENUM.ERROR_PAGE.NOT_FOUND));
});


module.exports = router;
