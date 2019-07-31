const mongoose = require("mongoose")

try {
  mongoose.connect(
    "mongodb+srv://caioquirino:123123123@api-je3kv.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
} catch (err) {
  console.log(err)
}
