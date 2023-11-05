const {Schema , model} = require("mongoose")

const GuildSchema = new Schema({
  name: {type: String, required: true},
  creator: {type: Schema.Types.ObjectId, ref: "User", required: true},
  category: [{type: Schema.Types.ObjectId, ref: "Category"}]
})

module.exports = model("Guild", GuildSchema)