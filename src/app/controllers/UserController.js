class UserController {
  async show(req, res) {
    const { user } = req

    return res.status(200).send(user)
  }

  async delete(req, res) {
    const { user } = req

    try {
      await user.remove()

      return res.status(200).send(user)
    } catch (err) {
      return res.status(500).send({ error: "Couldn't delete user" })
    }
  }
}

module.exports = new UserController()
