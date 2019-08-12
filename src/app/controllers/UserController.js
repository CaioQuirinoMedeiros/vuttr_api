const Tool = require("../models/Tool")

class UserController {
  async show(req, res) {
    const { user } = req

    await user.populate("tools").execPopulate()

    return res.status(200).send(user)
  }

  async delete(req, res) {
    const { user } = req

    try {
      await user.remove()
      await Tool.deleteMany({ user: user._id })

      return res.status(200).send(user)
    } catch (err) {
      return res
        .status(500)
        .send({ error: "Não foi possível deletar o usuário" })
    }
  }
}

module.exports = new UserController()
