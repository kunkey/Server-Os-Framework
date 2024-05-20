const router = require("express").Router();
// Middwares include here

const AuthController = require("@Controllers/http/app/auth.controller");

// router.get("/", (req, res) => AuthController.Index(req, res));
router.get("/check-token", (req, res) => AuthController.ValidateToken(req, res));
router.post("/login", (req, res) => AuthController.LoginAccount(req, res));
router.post("/register", (req, res) => AuthController.RegisterAccount(req, res));

module.exports = router;
