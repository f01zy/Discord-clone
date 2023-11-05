const {Schema , model} = require("mongoose")

const MessageSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  message: {type: String, required: true}
})

module.exports = model("Message", MessageSchema)