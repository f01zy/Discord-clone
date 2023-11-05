import { FC, useContext } from 'react'
import ISocket from '../interfaces/socket/Socket'
import Servers from '../components/Servers'
import MeChannels from '../components/MeChannels'
import ChatForUser from '../components/ChatForUser'
import { Navigate, useParams } from 'react-router-dom'
import { Context } from '../main'
import Create from '../components/Create'
import { observer } from 'mobx-react-lite'

const UserChat:FC<ISocket> = ({socket}):JSX.Element => {
  const params = useParams()

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
    <ChatForUser socket={socket} username={String(params.username)} />

    </>
  )
}

export default observer(UserChat)