const mongoose = require("mongoose")

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } catch (err) {
    console.log(err)
  }
}
