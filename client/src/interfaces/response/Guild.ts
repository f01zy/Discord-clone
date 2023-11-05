import ICategory from "./Category";

export default interface IGuild {
  name:string,
  category:Array<ICategory>,
  _id:string,
  creator:string
}