import IMessage from "./Message";
import IUser from "./User";

export default interface IFriendChat {
  user:IUser,
  messages:Array<IMessage>
}