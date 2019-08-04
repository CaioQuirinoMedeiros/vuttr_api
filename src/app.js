const express = require("express")
const cors = require("cors")

require("./bootstrap")
require("./database")
const auth = require("./app/middlewares/auth")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const toolRoutes = require("./routes/tool")

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRoutes)

app.use(auth)
app.use(userRoutes)
app.use(toolRoutes)

module.exports = app
