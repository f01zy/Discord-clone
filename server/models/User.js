const {Schema , model} = require("mongoose")

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
  friends: [{type: Schema.Types.ObjectId, ref: "User", default: []}],
  friendsChats: [{type: Schema.Types.ObjectId, ref: "FriendChat", default: []}],
  blocked: [{type: Schema.Types.ObjectId, ref: "User", default: []}],
  friendRequests: [{type: Schema.Types.ObjectId, ref: "User", default: []}],
  guilds: [{type: Schema.Types.ObjectId, ref: "Guild", default: []}],
  description: {type: String, default: ""},
  avatar: {type: String, default: null}
})

module.exports = model("User", UserSchema)