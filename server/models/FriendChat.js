const {Schema , model} = require("mongoose")

const FriendChatSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  messages: [{type: Schema.Types.ObjectId, ref: "Message", default: []}],
})

module.exports = model("FriendChat", FriendChatSchema)