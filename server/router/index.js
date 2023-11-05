const Router = require("express").Router
const router = Router()
const { body } = require("express-validator")
const UserController = require("../controllers/User")
const GuildController = require("../controllers/Guild")
const File = require("../middlewares/File")

// Auth router

router.post("/auth/register",
  body("username").isLength({min: 3, max: 25}),
  body("email").isEmail(),
  body("password").isLength({min: 8}),
  UserController.register
)
router.post("/auth/login", UserController.login)
router.post("/auth/logout", UserController.logout)
router.get("/auth/activate/:link", UserController.activate)
router.get("/auth/refresh", UserController.refresh)

// User

router.post("/user/friend/add", UserController.friendAdd)
router.post("/user/friend/confirm", UserController.friendConfirm)
router.get("/user/invite/:id", UserController.join)
router.post("/user/avatar/set", File.single("avatar") , UserController.setAvatar)

// Server

router.post("/server/create", GuildController.create)

module.exports = router