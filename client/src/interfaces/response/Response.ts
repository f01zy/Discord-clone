import IGuild from "./Guild";
import IUser from "./User";

export default interface IResponse {
  accessToken:string,
  refreshToken:string,
  user: IUser,
  guilds: Array<IGuild>
}