import IMessage from "./Message";

export default interface IChannel {
  name:string,
  messages:Array<IMessage>,
  _id:string
}