import { FC } from 'react'
import styles from "./Loading.module.scss"
import { BsDiscord } from 'react-icons/bs'

const Loading:FC = ():JSX.Element => {
  return (
    <>
    
    <div className={styles.loading_window}>
      <div className={styles.loading}>
        <div className={styles.icon}>
          <BsDiscord />
        </div>
        <h5>Did you know</h5>
        <p>You can type /tableflip and /unflip to splice<br />up your messages</p>
      </div>
    </div>
    
    </>
  )
}

export default Loading