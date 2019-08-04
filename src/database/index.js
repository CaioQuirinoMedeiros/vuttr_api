const mongoose = require("mongoose")
const databaseConfig = require("../config/database")

mongoose
  .connect(process.env.MONGO_URI, databaseConfig)
  .catch(err => console.log(err))
