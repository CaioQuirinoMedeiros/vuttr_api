const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid")
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { toJSON: { virtuals: true } }
)

userSchema.methods.hashPassword = async function() {
  this.password = await bcrypt.hash(this.password, 8)

  return this
}

userSchema.pre("save", async function(next) {
  const user = this

  if (user.isModified("password")) {
    await user.hashPassword()
  }

  next()
})

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Email não registrado")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Senha inválida")
  }

  return user
}

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET)

  this.tokens = this.tokens.concat({ token })

  await this.save()

  return token
}

userSchema.methods.toJSON = function() {
  const user = this.toObject({ virtuals: true })

  delete user.password
  delete user.tokens

  return user
}

const User = mongoose.model("User", userSchema)

module.exports = User
