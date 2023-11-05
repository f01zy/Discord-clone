import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Guild from './pages/Guild'
import Register from './pages/Register'
import Login from './pages/Login'
import { useContext, useEffect } from 'react'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import Join from './pages/Join'
import Me from './pages/Me'
import Loading from './components/Loading'
import { io } from "socket.io-client"
import IAddToFriendsSocket from './interfaces/socket/AddToFriends'
import IConfirm from './interfaces/response/Confirm'
import UserChat from './pages/UserChat'
import Settings from './components/Settings'
import { SERVER_URL } from './http'

const socket = io(SERVER_URL, {
  forceNew: true
})

const App = () => {
  const {store} = useContext(Context)

  useEffect(() => {
    if(localStorage.getItem("token")) {
      store.checkAuth()
    }

    socket.on("receive_message", data => {
      if(store.user.guilds.map(e => e.name == data.guild)) {
        store.setMessage({user: data.user, message: data.message}, data.guild, data.category, data.channel)
      }
    })

    socket.on("receive_message_for_user", data => {
      const isSendUser = store.user.friendsChats.map(e => e.user.username == data.username)[0]

      if(isSendUser) {
        store.setMessageForUser({user: data.user, message: data.message}, data.username)
      } else {
        store.setMessageForUser({user: data.user, message: data.message}, data.to)
      }
    })

    socket.on("receive_to_friends", (data:IAddToFriendsSocket) => {
      if(data.friend.username == store.user.username) {
        console.log("success");
        store.setUser(data.friend)
      }
    })

    socket.on("receive_confirm_to_friends", (data:IConfirm) => {
      if(data.friend.username == store.user.username) {
        store.setUser(data.friend)
      }
    })
  }, [])

  if(!store.isLoaded) {
    return <Loading />
  }

  if(store.settingsMenu) {
    return <Settings />
  }

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/channels/:guild/:category/:channel' element={<Guild socket={socket} />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/channels/invite/:link' element={<Join />}/>
        <Route path='/channels/@me' element={<Me socket={socket} />}/>
        <Route path='/channels/@me/:username' element={<UserChat socket={socket} />}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default observer(App)