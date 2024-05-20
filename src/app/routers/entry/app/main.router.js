const router = require("express").Router();
// Middwares include here

// router.get("/", (req, res) => AuthController.Index(req, res));
router.get("/", (req, res) => {
    res.send("ok");
});


module.exports = router;