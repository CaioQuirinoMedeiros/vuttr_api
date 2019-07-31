const express = require("express")
const router = new express.Router()
const ToolController = require("../app/controllers/ToolController")

router.post("/tools", ToolController.store)

router.get("/tools", ToolController.index)

router.get("/tools/:id", ToolController.show)

router.put("/tools/:id", ToolController.update)

router.delete("/tools/:id", ToolController.destroy)

module.exports = router
