import { FC, useContext } from 'react'
import Servers from '../components/Servers'
import MeChannels from '../components/MeChannels'
import MeMenuFriends from '../components/MeMenuFriends'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import Create from '../components/Create'
import { observer } from 'mobx-react-lite'
import ISocket from '../interfaces/socket/Socket'

const Me:FC<ISocket> = ({socket}):JSX.Element => {
  const {store} = useContext(Context)

  if(!store.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <>
    
    {store.createForm ? (
      <Create />
    ) : ""}
    <Servers />
    <MeChannels />
    <MeMenuFriends socket={socket} />
    
    </>
  )
}

export default observer(Me)