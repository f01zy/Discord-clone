const UserSchema = require("../models/User")
const MessageSchema = require("../models/Message")
const ApiError = require("../exceptions/Api")
const TokenService = require("./Token")
const UserService = require("./User")

class MessageService {
  async addMessage(email, message, guild, category, channel) {
    if(!email) {
      throw ApiError.UnauthorizedError()
    }

    const userData = await UserSchema.findOne({email})

    const user = await UserService.userPopulate(userData)

    const guildData = user.guilds.find(el => el.name == guild)

    if(guildData) {
      const categoryData = guildData.category.find(el => el.name == category)

      if (categoryData) {
        const channelData = categoryData.channels.find(el => el.name == channel)

        if(channelData) {
          const newMessage = await MessageSchema.create({user: user._id, message})

          channelData.messages.push(newMessage._id)

          channelData.save()
        } else {
          console.log("Произошла ошибка");
        }
      } else {
        console.log("Произошла ошибка");
      }
    } else {
      console.log("Произошла ошибка");
    }

    return user
  }

  async addMessageForUser(username, message, userUsername) {
    const userData = await UserSchema.findOne({username: userUsername})

    const user = await UserService.userPopulate(userData)

    const from = await UserSchema.findOne({username}).populate({
      path: "friendsChats",
      populate: {
        path: "user"
      }
    })

    const fromChannel = from.friendsChats.find(e => e.user.username == userUsername)
    const channel = user.friendsChats.find(e => e.user.username == username)

    if(!channel) {
      throw ApiError.BadRequest("Чата не существует")
    }

    const newMessage = await MessageSchema.create({message, user: user._id})

    fromChannel.messages.push(newMessage)
    channel.messages.push(newMessage)
    channel.save()
    fromChannel.save()

    return user
  }
}

module.exports = new MessageService()