import { FC } from 'react'
import styles from "./Active.module.scss"

const Active:FC = ():JSX.Element => {
  return (
    <>
    
    <div className={styles.active}>
      <h2>Активные контакты</h2>
      <div className={styles.active_contact}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <div className={styles.avatar_status}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.49993 0C2.73854 0 0.5 2.23854 0.5 4.99993C0.5 7.76131 2.73854 9.99985 5.49993 9.99985C8.26131 9.99985 10.4999 7.76131 10.4999 4.99993C10.4999 2.23854 8.26131 0 5.49993 0ZM3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4H3Z" fill="#ED4245"/>
              </svg>
            </div>
          </div>
          <div className={styles.username}>
            <h4>Todiro</h4>
            <p>VS Code</p>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Active