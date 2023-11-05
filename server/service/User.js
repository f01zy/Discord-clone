const UserSchema = require("../models/User")
const GuildSchema = require("../models/Guild")
const MailService = require("./Mail")
const FriendChatSchema = require("../models/FriendChat")
const TokenService = require("./Token")
const UserDto = require("../dtos/User")
const path = require("path")

const bcrypt = require("bcrypt")
const uuid = require("uuid")
const ApiError = require("../exceptions/Api")

class UserService {
  async register(username, email, password) {
    const candidateEmail = await UserSchema.findOne({email})

    if(candidateEmail) {
      throw ApiError.BadRequest("Пользователь с таким email уже сушествует")
    }

    const candidateUsername = await UserSchema.findOne({username})

    if(candidateUsername) {
      throw ApiError.BadRequest("Пользователь с таким username уже сушествует")
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserSchema.create({username, email, password: hashPassword, activationLink})

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userPopulate = await this.userPopulate(user)

    const dto = new UserDto(userPopulate)
    const tokens = await TokenService.generateTokens({...dto})
    await TokenService.saveToken(dto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userPopulate
    }
  }

  async login(email, password) {
    const user = await UserSchema.findOne({email})

    if(!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден")
    }

    const isPass = await bcrypt.compare(password, user.password)

    if(!isPass) {
      throw ApiError.BadRequest("Неверный пароль")
    }

    const userPopulate = await this.userPopulate(user)

    const dto = new UserDto(userPopulate)
    const tokens = await TokenService.generateTokens({...dto})
    await TokenService.saveToken(dto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userPopulate
    }
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  async activate(activationLink) {
    const user = await UserSchema.findOne({activationLink})

    if(!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации")
    }

    user.isActivated = true
    await user.save()
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefresh(refreshToken)
    const tokenDb = await TokenService.findToken(refreshToken)

    if(!tokenDb || !userData) {
      throw ApiError.UnauthorizedError()
    }
    
    const user = await UserSchema.findById(userData.id)

    const userPopulate = await this.userPopulate(user)

    const dto = new UserDto(userPopulate)
    const tokens = await TokenService.generateTokens({...dto})
    await TokenService.saveToken(dto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userPopulate,
    }
  }

  async join(id, refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefresh(refreshToken)

    if(!userData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserSchema.findById(userData.id)
    const guild = await GuildSchema.findOne({_id: id})

    if(!guild) {
      throw ApiError.BadRequest("Неккоректная ссылка приглашения")
    }

    user.guilds = [...user.guilds, guild._id]
    user.save()
  }

  async friendAdd(username, refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefresh(refreshToken)

    if(!userData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserSchema.findById(userData.id)

    const friend = await UserSchema.findOne({username})

    if(!friend) {
      throw ApiError.BadRequest("Пользователя с таким именем не существует")
    }

    const isFriend = friend.friends.indexOf(user._id) != -1
    const isUserFriend = user.friends.indexOf(friend._id) != -1

    if(isFriend || isUserFriend) {
      throw ApiError.BadRequest("Этот пользователь уже является вашим другом")
    }

    const isSending = friend.friendRequests.indexOf(user._id) != -1

    if(!isSending) {
      friend.friendRequests.push(user._id)
      friend.save()
    } else {
      throw ApiError.BadRequest("Вы уже отправили заявку этому пользователю. Дождитесь ответа")
    }

    const friendReturn = await this.userPopulate(friend)

    return friendReturn
  }

  async friendConfirm(username, refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefresh(refreshToken)

    if(!userData) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserSchema.findById(userData.id)
    const friend = await UserSchema.findOne({username})

    if(!friend) {
      throw ApiError.BadRequest("Пользователя не существует")
    }

    const friendChat = await FriendChatSchema.create({user: friend._id})
    const userChat = await FriendChatSchema.create({user: user._id})

    user.friendRequests = user.friendRequests.filter(e => String(e) != String(friend._id))
    user.friends.push(friend._id)
    user.friendsChats.push(friendChat._id)
    friend.friends.push(user._id)
    friend.friendsChats.push(userChat._id)
    user.save()
    friend.save()

    const userReturn = await this.userPopulate(user)

    const friendReturn = await this.userPopulate(friend)

    return {
      user: userReturn,
      friend: friendReturn
    }
  }

  async userPopulate(user) {
    const userReturn = await user.populate([
      {
        path: "guilds",
        populate: {
          path: "category",
          populate: {
            path: "channels",
            populate: {
              path: "messages",
              populate: {
                path: "user"
              }
            }
          }
        }
      },
      {
        path: "friendRequests"
      },
      {
        path: "friends"
      },
      {
        path: "blocked"
      },
      {
        path: "friendsChats",
        populate: [
          {
            path: "messages",
            populate: {
              path: "user"
            }
          },
          {
            path: "user"
          }
        ]
      },
    ])

    return userReturn
  }

  async setAvatar(file, refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefresh(refreshToken)
    const tokenDb = await TokenService.findToken(refreshToken)

    if(!tokenDb || !userData) {
      throw ApiError.UnauthorizedError()
    }
    
    const user = await UserSchema.findById(userData.id)

    user.avatar = file.filename
    user.save()

    const userPopulate = await this.userPopulate(user)

    return userPopulate
  }
}

module.exports = new UserService()