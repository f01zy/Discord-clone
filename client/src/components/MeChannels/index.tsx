import { FC, useContext } from 'react'
import styles from "./MeChannels.module.scss"
import UserChannelsMenu from '../UserChannelsMenu'
import User from '../User'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'

const MeChannels:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  return (
    <>
    
    <div className={styles.MeChannels}>
      <div className={styles.top_input}>
        <input type="text" placeholder='Найти или начать беседу' />
      </div>
      <div className={styles.top_links}>
        <div className={styles.top_link_block}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4.77528 2H1C1 10.6232 4.77528 13.744 6.66292 14.0725V19H22C22 12.5942 17.2809 12.5942 13.9775 12.5942C6.66292 12.5942 4.77528 6.43478 4.77528 2Z" fill="#8E9297"/>
            <path d="M13.9775 2.5C19.6405 2.5 19.6405 11.1232 13.9775 11.1232C8.0867 11.1232 8.31461 2.5 13.9775 2.5Z" fill="#8E9297"/>
          </svg>
          <h4>Друзья</h4>
        </div>
        <div className={styles.top_link_block}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M1.99062 8.54984C1.99062 8.95728 1.63522 9.29676 1.20867 9.29676H0.782119C0.355571 9.29676 0 8.95728 0 8.54984C0 8.14239 0.355571 7.80291 0.782119 7.80291H1.20867C1.63522 7.80291 1.99062 8.14239 1.99062 8.54984ZM21.2564 8.34612C23.1047 12.0811 21.3985 16.5629 17.3463 18.3285C13.4364 20.0262 8.74435 18.3964 6.967 14.6615C6.6116 13.9146 6.39833 13.0997 6.32718 12.2848H4.76311C4.33657 12.2848 3.98116 11.9451 3.98116 11.5377C3.98116 11.1303 4.33657 10.7908 4.76311 10.7908H7.03815C7.4647 10.7908 7.8201 10.4513 7.8201 10.0439C7.8201 9.63641 7.4647 9.29676 7.03815 9.29676H3.41249C2.98594 9.29676 2.63037 8.95728 2.63037 8.54984C2.63037 8.14239 2.98594 7.80291 3.41249 7.80291H8.45992C8.88647 7.80291 9.24187 7.46327 9.24187 7.05582C9.24187 6.64838 8.88647 6.3089 8.45992 6.3089H6.39833C5.75851 6.3089 5.18966 5.83349 5.18966 5.15453C5.18966 4.54337 5.68736 4 6.39833 4H14.4316C17.2753 4.13592 19.9767 5.69773 21.2564 8.34612ZM12.2719 7.59704C10.024 8.58305 9.03829 11.1231 10.0705 13.2703C11.1028 15.4175 13.7619 16.359 16.0098 15.373C18.2579 14.387 19.2434 11.847 18.2111 9.69977C17.1789 7.55255 14.5198 6.61103 12.2719 7.59704ZM15.8534 9.02519L17.2752 11.3341C17.3464 11.4699 17.3464 11.5378 17.2752 11.6736L15.8534 13.9825C15.7823 14.1182 15.6402 14.1182 15.569 14.1182H12.7965C12.6543 14.1182 12.5832 14.0503 12.5122 13.9825L11.0903 11.6736C11.0193 11.5378 11.0193 11.4699 11.0903 11.3341L12.5122 9.02519C12.5832 8.88943 12.7255 8.88943 12.7965 8.88943H15.569C15.7113 8.82147 15.7823 8.88943 15.8534 9.02519Z" fill="#8E9297"/>
          </svg>
          <h4>Nitro</h4>
        </div>
      </div>
      <div className={styles.chats}>
        <div className={styles.create_chat}>
          <h4>Личные сообщения</h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
            <path d="M6.81591 0.392578H5.56591V5.37508H0.582031V6.62508H5.56591V11.6202H6.81591V6.62508H11.8084V5.37508H6.81591V0.392578Z" fill="#B9BBBE"/>
            <path d="M7.00591 0.392578V0.202578H6.81591H5.56591H5.37591V0.392578V5.18508H0.582031H0.392031V5.37508V6.62508V6.81508H0.582031H5.37591V11.6202V11.8102H5.56591H6.81591H7.00591V11.6202V6.81508H11.8084H11.9984V6.62508V5.37508V5.18508H11.8084H7.00591V0.392578Z" stroke="#B9BBBE" strokeWidth="0.38"/>
          </svg>
        </div>
        {store.user.friendsChats.map((e, index) => (
          <div className={styles.chat} key={index}>
            <User username={e.user.username} status="test" id={e.user._id} avatar={e.user.avatar} />
          </div>
        ))}
      </div>
      <UserChannelsMenu />
    </div>
    
    </>
  )
}

export default observer(MeChannels)