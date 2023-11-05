const Router = require("express").Router;
const router = new Router();
const UserController = require("../controllers/UserController.js")

router.post("/login" , UserController.login)
router.post("/register" , UserController.register)

module.exports = router