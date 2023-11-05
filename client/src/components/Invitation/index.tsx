import { FC, useContext, useState } from 'react'
import styles from "./Invitation.module.scss"
import { AiOutlineClose } from 'react-icons/ai'
import { Context } from '../../main'
import IGuild from '../../interfaces/components/Guild'
import { CLIENT_URL } from '../../http'

const Invitation:FC<IGuild> = (props):JSX.Element => {
  const {store} = useContext(Context)
  const guild = store.user.guilds.filter(el => el._id == props.guild)[0]
  const [copyState, setCopyState] = useState(false)
  const [text, setText] = useState("Копи...")

  const copy = async (data:string) => {
    await navigator.clipboard.writeText(data)
    setCopyState(true)
    setText("Скоп...")

    setTimeout(() => {
      setCopyState(false)
      setText("Копи...")
    }, 1000)
  }

  return (
    <>
    
      <div className={styles.invitation}>
        <div className={styles.form}>
          <div className={styles.close} onClick={() => store.setInviteForm(false)}>
            <AiOutlineClose />
          </div>
          <h3>Пригласить друзей в <span>{guild?.name}</span></h3>
          <div className={styles.link}>
            <h4>Отправте другу ссылку-приглашение на сервер</h4>
            <div className={styles.field}>
              <p>{CLIENT_URL}/channels/join/{guild?._id}</p>
              <button onClick={() => copy(`${CLIENT_URL}/channels/join/${guild?._id}`)} className={copyState ? styles.button_copy : styles.button} >{text}</button>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Invitation