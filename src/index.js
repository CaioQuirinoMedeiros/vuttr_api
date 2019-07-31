const express = require("express")
const cors = require("cors")
require("dotenv").config()

require("./config/database/mongoose")

const app = express()

const port = process.env.PORT || 3000

app.use(cors())

app.get("/", (req, res) => {
  return res.status(200).send("All right")
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
