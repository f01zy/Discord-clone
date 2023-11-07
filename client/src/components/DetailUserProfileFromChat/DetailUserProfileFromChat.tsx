import { FC } from 'react'
import styles from "./DetailUserProfileFromChat.module.scss"
import IUser from '../../interfaces/response/User'
import { observer } from 'mobx-react-lite'
import { SERVER_URL } from '../../http'

const DetailUserProfileFromChat:FC<IUser> = (props):JSX.Element => {
  return (
    <>
    
    <div className={styles.detailUserProfileFromChat}>
      <div className={styles.banner}>

      </div>
      <div className={styles.avatar} style={{
        backgroundImage: `url("${SERVER_URL}/avatars/${props.avatar}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <div className={styles.avatar_status}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.49993 0C2.73854 0 0.5 2.23854 0.5 4.99993C0.5 7.76131 2.73854 9.99985 5.49993 9.99985C8.26131 9.99985 10.4999 7.76131 10.4999 4.99993C10.4999 2.23854 8.26131 0 5.49993 0ZM3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4H3Z" fill="#ED4245"/>
          </svg>
        </div>
      </div>
      <div className={styles.info_block_container}>
        <div className={styles.info_block}>
          <div className={styles.username_block}>
            <h3>{props.username}</h3>
            <h4>{props.username}</h4>
          </div>
          <div className={styles.desc_block}>
            <h4>Обо мне</h4>
            <p>Описание</p>
            <h4>В числе участников discord с</h4>
            <p>2 окт. 2020г</p>
          </div>
          <div className={styles.note}>
            <h4>Заметка</h4>
            <textarea placeholder='Нажмите чтобы добавить заметку'></textarea>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default observer(DetailUserProfileFromChat)