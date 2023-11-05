const ApiError = require("../exceptions/Api")
const TokenService = require("./Token")
const ChannelSchema = require("../models/Channel")
const CategorySchema = require("../models/Category")
const GuildSchema = require("../models/Guild")
const UserSchema = require("../models/User")
const MessageSchema = require("../models/Message")
const UserService = require("./User")

class GuildService {
  async create(name, refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefresh(refreshToken)

    if(!userData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserSchema.findById(userData.id)

    const message = await MessageSchema.create({user: user._id, message: "Hello From Discord!"})
    const channel = await ChannelSchema.create({name: "general", messages: [message]})
    const category = await CategorySchema.create({name: "Main", channels: [channel._id]})
    const server = await GuildSchema.create({name, category: [category._id], creator: user._id})

    user.guilds = [...user.guilds, server._id]
    user.save()

    const returnUser = await UserService.userPopulate(user)

    return returnUser
  }
}

module.exports = new GuildService()