const {Schema , model} = require("mongoose")

const CategorySchema = new Schema({
  name: {type: String, required: true},
  channels: [{type: Schema.Types.ObjectId, ref: "Channel"}]
})

module.exports = model("Category", CategorySchema)