const mongoose = require("mongoose")

try {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
} catch (err) {
  console.log(err)
}
