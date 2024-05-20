const router = require("express").Router();
// Middwares include here

const UserController = require("@Controllers/http/app/user.controller");

router.get("/", (req, res) => UserController.GetAllUsers(req, res));
router.get("/:id", (req, res) => UserController.UserInfo(req, res));
router.put("/:id", (req, res) => UserController.UserAction.UpdateInfo(req, res));
router.delete("/:id", (req, res) => UserController.UserAction.Delete(req, res));

module.exports = router;
