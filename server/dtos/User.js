module.exports = class UserDto {
  username
  email
  id
  isActivated
  guilds
  friends
  friendRequests
  blocked
  friendsChats

  constructor(model) {
    this.username = model.username
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
    this.guilds = model.guilds
    this.friends = model.friends
    this.friendRequests = model.friendRequests
    this.blocked = model.blocked
    this.friendsChats = model.friendsChats
  }
}