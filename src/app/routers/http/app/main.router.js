const router = require("express").Router();
// Middwares include here

router.get("/", (req, res) => {
    res.send("ok homme");
});

module.exports = router;
