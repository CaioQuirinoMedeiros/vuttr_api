const express = require("express")
const cors = require("cors")
require("dotenv").config()

require("./config/database/mongoose")
const authRoutes = require("./routes/auth")

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(authRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
