import { FC, useState } from 'react'
import styles from "./MeMenuFriends.module.scss"
import Online from './Online'
import Active from './Active'
import Friends from './Friends'
import Expectation from './Expectation'
import Blocked from './Blocked'
import AddToFriends from './AddToFriends'
import ISocket from '../../interfaces/socket/Socket'

const MeMenuFriends:FC<ISocket> = ({socket}):JSX.Element => {
  const [page, setPage] = useState("online")

  return (
    <>
    
    <div className={styles.MeMenuFriends}>
      <div className={styles.top_btns}>
        <div className={styles.name_channel}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4.77528 2H1C1 10.6232 4.77528 13.744 6.66292 14.0725V19H22C22 12.5942 17.2809 12.5942 13.9775 12.5942C6.66292 12.5942 4.77528 6.43478 4.77528 2Z" fill="#747F8D"/>
            <path d="M13.9775 2.5C19.6405 2.5 19.6405 11.1232 13.9775 11.1232C8.0867 11.1232 8.31461 2.5 13.9775 2.5Z" fill="#747F8D"/>
          </svg>
          <h4>Друзья</h4>
        </div>
        <div className={styles.buttons_content}>
          <div className={styles.buttons}>
            <div className={page == "online" ? styles.button_active : styles.button}>
              <button onClick={() => setPage("online")}>В сети</button>
            </div>
            <div className={page == "friends" ? styles.button_active : styles.button}>
              <button onClick={() => setPage("friends")}>Все</button>
            </div>
            <div className={page == "expectation" ? styles.button_active : styles.button}>
              <button onClick={() => setPage("expectation")}>Ожидание</button>
            </div>
            <div className={page == "blocked" ? styles.button_active : styles.button}>
              <button onClick={() => setPage("blocked")}>Заблокированные</button>
            </div>
            <div className={page == "addToFriends" ? styles.button_active : styles.button}>
              <button onClick={() => setPage("addToFriends")}>Добавить в друзья</button>
            </div>
          </div>
          <div className={styles.icons}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z" fill="#B9BBBE"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15.998 0H1.98805C0.878047 0 0.00804687 0.89 0.00804687 2L-0.00195312 16C-0.00195312 17.1 0.878047 18 1.98805 18H15.998C17.098 18 17.998 17.1 17.998 16V2C17.998 0.89 17.098 0 15.998 0ZM15.998 12H11.998C11.998 13.66 10.648 15 8.99805 15C7.34805 15 5.99805 13.66 5.99805 12H1.98805V2H15.998V12Z" fill="#B9BBBE"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.99805 0C4.48405 0 -0.00195312 4.487 -0.00195312 10C-0.00195312 15.515 4.48405 20 9.99805 20C15.512 20 19.998 15.515 19.998 10C19.998 4.487 15.512 0 9.99805 0ZM9.99805 16.25C9.30805 16.25 8.74805 15.691 8.74805 15C8.74805 14.31 9.30805 13.75 9.99805 13.75C10.688 13.75 11.248 14.31 11.248 15C11.248 15.691 10.688 16.25 9.99805 16.25ZM10.998 11.875V13H8.99805V10H9.99805C11.102 10 11.998 9.103 11.998 8C11.998 6.896 11.102 6 9.99805 6C8.89405 6 7.99805 6.896 7.99805 8H5.99805C5.99805 5.795 7.79305 4 9.99805 4C12.203 4 13.998 5.795 13.998 8C13.998 9.861 12.721 11.429 10.998 11.875Z" fill="#B9BBBE"/>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.MeMenuFriendsBottomContent}>
        {page == "online" && (
          <Online />
        )}
        {page == "friends" && (
          <Friends />
        )}
        {page == "expectation" && (
          <Expectation socket={socket} />
        )}
        {page == "blocked" && (
          <Blocked />
        )}
        {page == "addToFriends" && (
          <AddToFriends socket={socket} />
        )}
        <Active />
      </div>
    </div>
    
    </>
  )
}

export default MeMenuFriends