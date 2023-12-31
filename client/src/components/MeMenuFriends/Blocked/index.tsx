import { FC, useContext } from 'react'
import styles from "./Blocked.module.scss"
import { Context } from '../../../main'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { SERVER_URL } from '../../../http'

const Blocked:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  return (
    <>
    
    <div className={styles.blocked}>
      <div className={styles.search}>
        <input type="text" placeholder='Поиск' />
      </div>
      <div className={styles.blocked_users}>
        <div className={styles.blocked_count}>
          <h4>Заблокированные - {store.user.blocked.length}</h4>
        </div>
        <div className={styles.blocked_content}>
          {store.user.blocked.map(e => (
            <div className={styles.block}>
              <Link to={`/channels/@me/${e.username}`}><div className={styles.user}>
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
                  <p>test</p>
                </div>
              </div></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    </>
  )
}

export default observer(Blocked)