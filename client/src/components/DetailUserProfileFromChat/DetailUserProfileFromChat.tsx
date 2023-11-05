import { FC } from 'react'
import styles from "./DetailUserProfileFromChat.module.scss"
import IUser from '../../interfaces/response/User'
import { observer } from 'mobx-react-lite'

const DetailUserProfileFromChat:FC<IUser> = (props):JSX.Element => {
  return (
    <>
    
    <div className={styles.detailUserProfileFromChat}>
      <div className={styles.banner}>

      </div>
      <div className={styles.avatar}>

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