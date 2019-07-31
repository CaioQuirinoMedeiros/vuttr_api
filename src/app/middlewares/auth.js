/* eslint-disable require-atomic-updates */
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded.id, "tokens.token": token })

    if (!user) {
      throw new Error()
    }

    req.user = user
    req.token = token

    next()
  } catch (err) {
    return res.status(401).send({ error: "Please authenticate" })
  }
}

module.exports = auth
