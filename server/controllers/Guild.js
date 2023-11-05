const GuildService = require("../service/Guild")

class GuildController {
  async create(req, res, next) {
    try {
      const {guild} = req.body
      const {refreshToken} = req.cookies
      const server = await GuildService.create(guild, refreshToken)
      return res.json(server)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new GuildController()