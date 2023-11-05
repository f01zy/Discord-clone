import { FC, useContext } from 'react'
import styles from "./Expectation.module.scss"
import expectation from "../../../assets/expectation/expectation.svg"
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite'
import ISocket from '../../../interfaces/socket/Socket'
import { SERVER_URL } from '../../../http'

const Expectation:FC<ISocket> = ({socket}):JSX.Element => {
  const {store} = useContext(Context)

  const friendConfirm = async (username:string) => {
    const friend = await store.friendConfirm(username)
    socket.emit("send_confirm_to_friends", {friend})
  }

  return (
    <>
    
    <div className={styles.expectation}>
      {store.user.friendRequests.length == 0 ? (
        <div className={styles.error}>
          <img src={expectation} />
          <p>Пока здесь нет запросов дружбы, ожидающих<br />подтверждения. Зато здесь сидит вампус</p>
        </div>
      ) : (
        <>
          <div className={styles.search}>
            <input type="text" placeholder='Поиск' />
          </div>
          <div className={styles.expectations}>
            <div className={styles.expectation_count}>
              <h4>Ожидание - {store.user.friendRequests.length}</h4>
            </div>
            <div className={styles.expectation_content}>
              {store.user.friendRequests.map(e => (
                <div className={styles.element}>
                  <div className={styles.user}>
                    <div className={styles.avatar} style={{
                      backgroundImage: `url("${SERVER_URL}/avatars/${e.avatar}")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}>
                      <div className={styles.avatar_status}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.49993 0C2.73854 0 0.5 2.23854 0.5 4.99993C0.5 7.76131 2.73854 9.99985 5.49993 9.99985C8.26131 9.99985 10.4999 7.76131 10.4999 4.99993C10.4999 2.23854 8.26131 0 5.49993 0ZM3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4H3Z" fill="#ED4245"/>
                        </svg>
                      </div>
                    </div>
                    <div className={styles.username}>
                      <h4>{e.username}</h4>
                      <p>Входящий запрос дружбы</p>
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <div className={styles.success_button} onClick={() => friendConfirm(e.username)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#B9BBBE" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z" ></path></svg>
                    </div>
                    <div className={styles.error_button}>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#B9BBBE" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
    
    </>
  )
}

export default observer(Expectation)