const mongoose = require("mongoose")
const databaseConfig = require("../config/database")

mongoose
  .connect(process.env.MONGO_URL, databaseConfig)
  .catch(err => console.log(err))
