import IFriendChat from "./FriendChat";
import IGuild from "./Guild";

export default interface IUser {
  username:string,
  email:string,
  isActivated:boolean,
  _id:string,
  guilds:Array<IGuild>,
  friends:Array<IUser>,
  blocked:Array<IUser>,
  friendRequests:Array<IUser>,
  friendsChats:Array<IFriendChat>
}