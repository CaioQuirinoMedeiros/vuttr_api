const Tool = require("../models/Tool")

class ToolController {
  async store(req, res) {
    const { title, link, description, tags } = req.body
    const { user } = req

    try {
      const tool = new Tool({ title, link, description, tags, user: user._id })

      await tool.save()

      return res.status(201).send(tool)
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Não foi possível adicionar a ferramenta" })
    }
  }

  async index(req, res) {
    const { user } = req
    const { tag, title } = req.query

    try {
      const query = Tool.find({ user: user._id })

      if (tag) {
        query.find({ tags: { $regex: tag } })
      } else if (title) {
        query.find({ title: { $regex: title, $options: "i" } })
      }

      const tools = await query.exec()

      return res.status(200).send(tools)
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Erro ao buscar as ferramentas" })
    }
  }

  async show(req, res) {
    const { id: _id } = req.params
    const { user } = req

    try {
      const tool = await Tool.findOne({ _id, user: user._id })

      if (!tool) {
        return res.status(404).send({ error: "Ferramenta não encontrada" })
      }

      return res.status(200).send(tool)
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Erro ao buscar as ferramentas" })
    }
  }

  async update(req, res) {
    const { id: _id } = req.params
    const updates = req.body
    const { user } = req

    try {
      const tool = await Tool.findOne({ _id, user: user._id })

      if (!tool) {
        return res.status(404).send({ error: "Ferramenta não encontrada" })
      }

      await tool.customUpdate(updates)

      return res.status(200).send(tool)
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Não foi possível editar a ferramenta" })
    }
  }

  async destroy(req, res) {
    const { id: _id } = req.params
    const { user } = req

    try {
      const tool = await Tool.findOneAndDelete({ _id, user: user._id })

      if (!tool) {
        return res.status(404).send({ error: "Ferramenta não encontrada" })
      }

      return res.status(200).send(tool)
    } catch (err) {
      return res
        .status(err.status || 400)
        .send({ error: "Não foi possível deletar a ferramenta" })
    }
  }
}

module.exports = new ToolController()
