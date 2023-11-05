import { FC } from 'react'
import styles from "./Members.module.scss"
import User from '../User'
import { observer } from 'mobx-react-lite'

const Members:FC = ():JSX.Element => {
  return (
    <>
    
    <div className={styles.members}>
      <div className={styles.role}>
        <h4>Owner - 1</h4>
        <User />
      </div>
      <div className={styles.role}>
        <h4>Members - 2</h4>
        <User />
        <User />
      </div>
    </div>
    
    </>
  )
}

export default observer(Members)