const express = require("express")
const cors = require("cors")
require("dotenv").config()

require("./config/database/mongoose")
const auth = require("./app/middlewares/auth")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(authRoutes)

app.use(auth)
app.use(userRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
