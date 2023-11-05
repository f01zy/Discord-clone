import { FC, useContext } from 'react'
import styles from "./UserChannelsMenu.module.scss"
import { Context } from '../../main'
import { SERVER_URL } from '../../http'

const UserChannelsMenu:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  return (
    <>
    
    <div className={styles.profile}>
        <div className={styles.user}>
          <div className={styles.left}>
            <div className={styles.avatar} style={{
              backgroundImage: `url("${SERVER_URL}/avatars/${store.user.avatar}")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}>
              <div className={styles.avatar_status}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.49993 0C2.73854 0 0.5 2.23854 0.5 4.99993C0.5 7.76131 2.73854 9.99985 5.49993 9.99985C8.26131 9.99985 10.4999 7.76131 10.4999 4.99993C10.4999 2.23854 8.26131 0 5.49993 0ZM3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4H3Z" fill="#ED4245"/>
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h4>{store.user.username}</h4>
            <p>Не беспокои...</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17" viewBox="0 0 12 17" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.56286 8.05263C8.56286 9.5379 7.42286 10.7368 6 10.7368C4.57714 10.7368 3.42857 9.5379 3.42857 8.05263V2.68421C3.42857 1.19895 4.57714 0 6 0C7.42286 0 8.57143 1.19895 8.57143 2.68421L8.56286 8.05263ZM6 12.6158C8.36571 12.6158 10.5429 10.7368 10.5429 8.05263H12C12 11.1126 9.66857 13.6358 6.85714 14.0653V17H5.14286V14.0653C2.33143 13.6268 0 11.1037 0 8.05263H1.45714C1.45714 10.7368 3.63429 12.6158 6 12.6158Z" fill="#C7C9CB"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M8 0.5C3.5888 0.5 0 4.08799 0 8.50002V14.9C0 15.7832 0.716 16.5 1.6 16.5H3.2C4.0832 16.5 4.8 15.7832 4.8 14.9V12.5C4.8 11.6168 4.0832 10.9 3.2 10.9H1.6V8.50002C1.6 4.97039 4.4712 2.1 8 2.1C11.5288 2.1 14.4 4.97039 14.4 8.50002V10.9H12.8C11.9168 10.9 11.2 11.6168 11.2 12.5V14.9C11.2 15.7832 11.9168 16.5 12.8 16.5H14.4C15.2832 16.5 16 15.7832 16 14.9V8.50002C16 4.08799 12.4112 0.5 8 0.5Z" fill="#C7C9CB"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" onClick={() => store.setSettingsMenu(true)}>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.1904 6.9H16V10.1H14.1912C13.9984 10.8448 13.68 11.5384 13.252 12.1512L14.4 13.3L12.8 14.9L11.652 13.7512C11.0376 14.1792 10.3456 14.4984 9.6 14.6904V16.5H6.4V14.6904C5.6552 14.4984 4.9624 14.1792 4.3488 13.7512L3.2 14.9L1.6 13.3L2.7488 12.1512C2.3208 11.5392 2.0016 10.8456 1.8096 10.1H0V6.9H1.8096C2.0016 6.1544 2.32 5.4616 2.7488 4.8488L1.6 3.7L3.2 2.1L4.3488 3.2488C4.9616 2.82 5.6544 2.5016 6.4 2.3096V0.5H9.6V2.3088C10.3456 2.5016 11.0376 2.82 11.652 3.248L12.8 2.0992L14.4 3.6992L13.2512 4.8488C13.6792 5.4616 13.9984 6.1552 14.1904 6.9ZM8 11.7C9.76728 11.7 11.2 10.2673 11.2 8.5C11.2 6.73269 9.76728 5.3 8 5.3C6.23269 5.3 4.8 6.73269 4.8 8.5C4.8 10.2673 6.23269 11.7 8 11.7Z" fill="#C7C9CB"/>
          </svg>
        </div>
      </div>
    
    </>
  )
}

export default UserChannelsMenu