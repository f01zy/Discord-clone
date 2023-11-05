import axios from 'axios'

export const SERVER_URL = `http://localhost:3000`
export const API_URL = `http://localhost:3000/api`
export const CLIENT_URL = `http://localhost:5173`

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})

$api.interceptors.response.use(
(config) => {
  return config
},
async err => {
  const originalRequest = err.config
  if(err.response.status == 401 && err.config && !err.config._isRetry) {
    try {
      originalRequest._isRetry = true
      const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem("token", res.data.accessToken)
      return $api.request(originalRequest)
    } catch (e) {
      console.log("Не авторизован");
    }
  }
  throw err
})

export default $api