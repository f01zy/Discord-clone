import { AxiosResponse } from "axios";
import $api from "../http";
import IResponse from "../interfaces/response/Response";
import IUser from "../interfaces/response/User";
import IConfirm from "../interfaces/response/Confirm";

export default class Auth {
  static async login(email:string, password:string): Promise<AxiosResponse<IResponse>> {
    return $api.post<IResponse>("auth/login", {email, password})
  }

  static async register(username:string, email:string, password:string): Promise<AxiosResponse<IResponse>> {
    return $api.post<IResponse>("auth/register", {username, email, password})
  }

  static async create(guild:string): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("server/create", {guild})
  }

  static async logout(): Promise<void> {
    return $api.post("auth/logout")
  }

  static async friendAdd(username:string): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("user/friend/add", {username})
  }

  static async friendConfirm(username:string): Promise<AxiosResponse<IConfirm>> {
    return $api.post<IConfirm>("user/friend/confirm", {username})
  }
}