import { FC, useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Servers from '../components/Servers'
import Channels from '../components/Channels'
import Chat from '../components/Chat'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'
import Create from '../components/Create'
import Invitation from '../components/Invitation'
import ISocket from '../interfaces/socket/Socket'

const Guild:FC<ISocket> = ({socket}):JSX.Element => {
  const {store} = useContext(Context)
  const params = useParams()

  if(!store.isAuth) {
    return <Navigate to="/login" />
  }

  return (
    <>
    
    {store.createForm ? (
      <Create />
    ) : ""}
    {store.inviteForm ? (
      <Invitation guild={String(params.guild)} />
    ) : ""}
    <Servers />
    <Channels guild={String(params.guild)} />
    <Chat guild={String(params.guild)} category={String(params.category)} channel={String(params.channel)} socket={socket} />
    
    </>
  )
}

export default observer(Guild)