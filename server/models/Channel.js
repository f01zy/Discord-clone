const {Schema , model} = require("mongoose")

const ChannelSchema = new Schema({
  name: {type: String, required: true},
  messages: [{type: Schema.Types.ObjectId, ref: "Message"}]
})

module.exports = model("Channel", ChannelSchema)