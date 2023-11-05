const jwt = require("jsonwebtoken")
const TokenSchema = require("../models/Token")

class TokenService {
  validateAccess(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefresh(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }

  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenSchema.findOne({user: userId})

    if(tokenData) {
      tokenData.refreshToken = refreshToken

      return tokenData.save()
    }

    const token = await TokenSchema.create({user: userId, refreshToken})
    
    return token
  }

  async removeToken(refreshToken) {
    const token = await TokenSchema.deleteOne({refreshToken})
    return token
  }

  async findToken(refreshToken) {
    const token = await TokenSchema.findOne({refreshToken})
    return token
  }
}

module.exports = new TokenService()