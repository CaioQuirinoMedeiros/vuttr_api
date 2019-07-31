const mongoose = require("mongoose")
const validator = require("validator")

const toolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Link is not a valir URL")
        }
      }
    },
    description: {
      type: String,
      minlength: 3
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { toJSON: { virtuals: true } }
)

toolSchema.methods.customUpdate = async function(updates) {
  const updatesKeys = Object.keys(updates)
  const allowedUpdates = ["title", "link", "description", "tags"]
  const isUpdatesValid = updatesKeys.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isUpdatesValid) {
    throw new Error("Parâmetros incorretos para editar a ferramenta")
  }

  updatesKeys.forEach(update => (this[update] = updates[update]))

  await this.save()

  return this
}

const Tool = mongoose.model("Tool", toolSchema)

module.exports = Tool
