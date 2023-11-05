import IChannel from "./Channel";

export default interface ICategory {
  name:string,
  channels:Array<IChannel>,
  _id:string
}