import { makeAutoObservable } from 'mobx'
import IUser from '../interfaces/response/User'
import Auth from '../services/Auth'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../http'
import IMessage from '../interfaces/response/Message'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoaded = true
  createForm = false
  inviteForm = false
  settingsMenu = false

  constructor () {
    makeAutoObservable(this)
  }

  setAuth(bool:boolean) {
    this.isAuth = bool
  }

  setSettingsMenu(bool:boolean) {
    this.settingsMenu = bool
  }

  setCreateForm(bool:boolean) {
    this.createForm = bool
  }

  setUser(user:IUser) {
    this.user = user
  }

  setLoaded(bool:boolean) {
    this.isLoaded = bool
  }

  setMessage(message:IMessage, guild:string, category:string, channel:string) {
    this.user.guilds.filter(el => el.name == guild)[0].category.filter(el => el.name == category)[0].channels.filter(el => el.name == channel)[0].messages.push(message)
  }

  setMessageForUser(message:IMessage, username:string) {
    this.user.friendsChats.find(e => e.user.username == username)?.messages.push(message)
  }

  setInviteForm(bool:boolean) {
    this.inviteForm = bool
  }

  async login(email:string, password:string) {
    try {
      const res = await Auth.login(email, password)
      localStorage.setItem("token", res.data.accessToken)
      this.setUser(res.data.user)
      this.setAuth(true)
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }

  async register(username:string, email:string, password:string) {
    try {
      const res = await Auth.register(username, email, password)
      localStorage.setItem("token", res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }

  async logout() {
    try {
      await Auth.logout()
      localStorage.removeItem("token")
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoaded(false)
    try {
      const res = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
      localStorage.setItem("token", res.data.accessToken)
      this.setUser(res.data.user)
      this.setAuth(true)
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoaded(true)
    }
  }

  async join(link:string) {
    try {
      const res = await axios.get(`${API_URL}/join/${link}`, {withCredentials: true})
      this.setUser(res.data.user)
    } catch (e) {
      console.log(e);
    }
  }

  async create(server:string) {
    try {
      const res = await Auth.create(server)
      this.setUser(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  async friendAdd(username:string) {
    try {
      const res = await Auth.friendAdd(username)
      return res.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }

  async friendConfirm(username:string) {
    try {
      const res = await Auth.friendConfirm(username)
      console.log(res);
      this.setUser(res.data.user)
      return res.data.friend
    } catch (e) {
      console.log(e);
    }
  }
}