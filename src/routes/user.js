const express = require("express")
const router = new express.Router()
const UserController = require("../app/controllers/UserController")

router.get("/me", UserController.show)

router.delete("/me", UserController.delete)

module.exports = router
