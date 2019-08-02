const User = require("../models/User")

class AuthController {
  async register(req, res) {
    const user = new User(req.body)

    try {
      await user.save()

      const token = await user.generateAuthToken()

      return res.status(201).send({ user, token })
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Não foi possível criar o cadastro" })
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findByCredentials(email, password)

      const token = await user.generateAuthToken()

      return res.status(200).send({ user, token })
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Erro ao fazer login" })
    }
  }
  async logout(req, res) {
    const { token: activeToken, user } = req

    try {
      user.tokens = user.tokens.filter(token => token.token !== activeToken)

      await user.save()

      return res.status(200).send()
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Não foi possível fazer logout" })
    }
  }

  async logoutAll(req, res) {
    const { user } = req

    try {
      user.tokens = []

      await user.save()

      return res.status(200).send()
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Não foi possível fazer logout de todos os acessos" })
    }
  }
}

module.exports = new AuthController()
