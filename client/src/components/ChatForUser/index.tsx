import { FC, useContext, useState } from 'react'
import { PiPhoneCallFill } from 'react-icons/pi'
import styles from './ChatForUser.module.scss'
import { AiFillQuestionCircle, AiOutlinePaperClip, AiFillMail } from 'react-icons/ai'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { Context } from '../../main'
import { FaUserPlus, FaUserCircle } from 'react-icons/fa'
import { observer } from 'mobx-react-lite'
import ISocket from '../../interfaces/socket/Socket'
import { Link } from 'react-router-dom'
import DetailUserProfileFromChat from '../DetailUserProfileFromChat/DetailUserProfileFromChat'

interface IUsername {
  username:string
}

const ChatForUser:FC<ISocket & IUsername> = (props):JSX.Element => {
  const {store} = useContext(Context)
  const [message, setMessage] = useState("")
  const [detail, setDetail] = useState(false)
  const channel = store.user.friendsChats.filter(e => e.user.username == props.username)[0]

  const sendMessage = () => {
    props.socket.emit("send_message_for_user", {to: store.user.username, username: props.username, message, userUsername: store.user.username})
  }

  return (
    <>
    
    <div className={styles.userChat}>
      <div className={styles.top_btns}>
        <div className={styles.channel_name}>
          <div className={styles.friend}>
            <Link to={`/channels/@me/${channel.user.username}`}><div className={styles.user}>
              <div className={styles.avatar}>
                <div className={styles.avatar_status}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.49993 0C2.73854 0 0.5 2.23854 0.5 4.99993C0.5 7.76131 2.73854 9.99985 5.49993 9.99985C8.26131 9.99985 10.4999 7.76131 10.4999 4.99993C10.4999 2.23854 8.26131 0 5.49993 0ZM3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H8C8.55228 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4H3Z" fill="#ED4245"/>
                  </svg>
                </div>
              </div>
              <div className={styles.username}>
                <h4>{channel.user.username}</h4>
              </div>
            </div></Link>
          </div>
        </div>
        <div className={styles.top_btns_buttons}>
          <PiPhoneCallFill />
          <BsFillCameraVideoFill />
          <AiOutlinePaperClip />
          <FaUserPlus />
          <FaUserCircle onClick={() => setDetail(!detail)} />
          <input type="text" placeholder='Поиск' />
          <AiFillMail />
          <AiFillQuestionCircle />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.messages_container}>
          <div className={styles.messages}>
            <div className={styles.greeting}>
              <h1>Добро пожаловать в канал {channel.user.username}</h1>
              <p>Это начало канала {channel.user.username}</p>
            </div>
            {channel.messages.map((e, index) => (
              <div className={styles.message} key={index}>
                <div className={styles.left}>
                  <div className={styles.avatar}></div>
                </div>
                <div className={styles.right}>
                  <div className={styles.username}>
                    <h5>{e.user.username}</h5>
                  </div>
                  <div className={styles.message_text}>
                    <p>{e.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.input_message}>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11 9V5H9V9H5V11H9V15H11V11H15V9H11Z" fill="#C4C4C4"/>
              </svg>
            </div>
            <input type="text" placeholder='Написать # 💬・general' onChange={e => setMessage(e.target.value)} value={message} />
            <div className={styles.left_icons}>
              <svg xmlns="http://www.w3.org/2000/svg" width="137" height="22" viewBox="0 0 137 22" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M137 11C137 17.0751 132.075 22 126 22C119.925 22 115 17.0751 115 11C115 4.92487 119.925 0 126 0C132.075 0 137 4.92487 137 11ZM120.5 12.2223C122.317 12.5755 123.786 12.8334 126 12.8334C128.214 12.8334 129.683 12.5755 131.5 12.2223C131.915 12.1416 132.722 12.2223 132.722 13.4445C132.722 15.889 129.914 18.9445 126 18.9445C122.086 18.9445 119.278 15.889 119.278 13.4445C119.278 12.2223 120.085 12.1422 120.5 12.2223ZM122.333 10.3889C123.177 10.3889 123.861 9.43125 123.861 8.24997C123.861 7.0687 123.177 6.11108 122.333 6.11108C121.49 6.11108 120.806 7.0687 120.806 8.24997C120.806 9.43125 121.49 10.3889 122.333 10.3889ZM131.194 8.24997C131.194 9.43125 130.51 10.3889 129.667 10.3889C128.823 10.3889 128.139 9.43125 128.139 8.24997C128.139 7.0687 128.823 6.11108 129.667 6.11108C130.51 6.11108 131.194 7.0687 131.194 8.24997Z" fill="#B9BBBE"/>
                <path d="M120.5 13.4443C120.5 13.4443 122.333 14.0554 126 14.0554C129.667 14.0554 131.5 13.4443 131.5 13.4443C131.5 13.4443 130.278 15.8888 126 15.8888C121.722 15.8888 120.5 13.4443 120.5 13.4443Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M89.5 5.4208V0.0610973H81.1C80.543 0.0610973 80.0089 0.271799 79.6151 0.646852C79.2212 1.0219 79 1.53058 79 2.06099V18.0001C79 18.5305 79.2212 19.0392 79.6151 19.4142C80.0089 19.7893 80.543 20 81.1 20H97.9C98.457 20 98.9911 19.7893 99.3849 19.4142C99.7787 19.0392 100 18.5305 100 18.0001V10.0006H94.309C93.0361 9.99269 91.8177 9.50766 90.9176 8.65048C90.0176 7.79331 89.5083 6.633 89.5 5.4208ZM89 15.5C88.0727 15.5 87.1833 15.1492 86.5276 14.5247C85.8719 13.9003 85.5035 13.0533 85.5035 12.1702H86.9C86.9 12.7006 87.1212 13.2093 87.5151 13.5843C87.9089 13.9594 88.443 14.1701 89 14.1701C89.557 14.1701 90.0911 13.9594 90.4849 13.5843C90.8787 13.2093 91.1 12.7006 91.1 12.1702H92.4965C92.4965 13.0533 92.1281 13.9003 91.4724 14.5247C90.8167 15.1492 89.9273 15.5 89 15.5ZM91.6 5.4008V0.661064C91.5977 0.53031 91.6368 0.401923 91.7123 0.292679C91.7877 0.183436 91.8961 0.098418 92.0231 0.0487347C92.1501 -0.000948593 92.2899 -0.0129862 92.4243 0.0141948C92.5586 0.0413758 92.6812 0.106511 92.776 0.20109L99.8005 6.88072C99.8952 6.97355 99.9592 7.09086 99.9845 7.21806C100.01 7.34525 99.9952 7.47671 99.9426 7.59608C99.89 7.71545 99.8017 7.81744 99.6887 7.88938C99.5757 7.96132 99.4429 8.00002 99.307 8.00066H94.33C93.9711 8.00198 93.6155 7.93564 93.2836 7.80545C92.9518 7.67526 92.6503 7.48381 92.3965 7.24213C92.1427 7.00045 91.9417 6.71331 91.805 6.39729C91.6683 6.08126 91.5986 5.74259 91.6 5.4008ZM83.569 13.0527C83.569 13.8144 82.9206 14.4319 82.1207 14.4319C81.3208 14.4319 80.6724 13.8144 80.6724 13.0527C80.6724 12.291 81.3208 11.6735 82.1207 11.6735C82.9206 11.6735 83.569 12.291 83.569 13.0527ZM95.8793 14.4319C96.6792 14.4319 97.3276 13.8144 97.3276 13.0527C97.3276 12.291 96.6792 11.6735 95.8793 11.6735C95.0795 11.6735 94.431 12.291 94.431 13.0527C94.431 13.8144 95.0795 14.4319 95.8793 14.4319Z" fill="#B9BBBE"/>
                <path d="M40 0C38.8954 0 38 0.89543 38 2V18C38 19.1046 38.8954 20 40 20H60C61.1046 20 62 19.1046 62 18V2C62 0.89543 61.1046 0 60 0H40ZM47.7645 9.448V13.48C46.9004 14.044 45.8804 14.356 44.7404 14.356C42.1124 14.356 40.6604 12.628 40.6604 10.072C40.6604 7.504 42.2324 5.764 44.7884 5.764C45.8084 5.764 46.6604 6.004 47.3204 6.376L47.0444 8.164C46.4205 7.768 45.6884 7.456 44.8365 7.456C43.4085 7.456 42.7125 8.512 42.7125 10.06C42.7125 11.62 43.4324 12.712 44.8604 12.712C45.3164 12.712 45.6405 12.616 45.9764 12.448V10.972H44.4285V9.448H47.7645ZM49.5481 5.92H51.6001V14.2H49.5481V5.92ZM58.4724 5.92V7.636H55.5564V9.328H57.8604V11.044H55.5564V14.2H53.5164V5.92H58.4724Z" fill="#B9BBBE"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.886 5.97932H18C19.104 5.97932 20 6.87764 20 7.98227V9.98523H0V7.98227C0 6.87764 0.897 5.97932 2 5.97932H5.114C4.663 5.74397 4.236 5.45655 3.879 5.10002C2.709 3.92829 2.709 2.02248 3.879 0.851756C5.012 -0.282917 6.986 -0.282917 8.121 0.849753C9.758 2.48917 9.979 5.57472 9.998 5.92123C9.9991 5.93275 9.9966 5.94306 9.9941 5.95332C9.992 5.9618 9.99 5.97026 9.99 5.97932H10.01C10.01 5.97017 10.0079 5.96163 10.0058 5.95315C10.0034 5.94309 10.0009 5.93311 10.002 5.92224C10.022 5.57572 10.242 2.49017 11.879 0.850755C13.014 -0.283919 14.986 -0.282917 16.121 0.849753C17.29 2.02348 17.29 3.9293 16.121 5.10002C15.764 5.45655 15.337 5.74397 14.886 5.97932ZM12.174 4.80258C12.359 3.91828 12.702 2.85872 13.293 2.26785C13.481 2.07756 13.732 1.97441 14 1.97441C14.268 1.97441 14.519 2.07756 14.706 2.26584C15.096 2.65742 15.097 3.29236 14.707 3.68393C14.116 4.27581 13.057 4.62031 12.174 4.80258ZM1 11.9882V17.997C1 19.1017 1.897 20 3 20H9V11.9882H1ZM11 11.9882V20H17C18.104 20 19 19.1017 19 17.997V11.9882H11ZM5.293 2.26684C4.903 2.65742 4.903 3.29236 5.293 3.68393C5.879 4.2708 6.945 4.61731 7.825 4.80058C7.641 3.91728 7.297 2.85771 6.707 2.26684C6.519 2.07756 6.268 1.97441 6 1.97441C5.732 1.97441 5.481 2.07756 5.293 2.26684Z" fill="#B9BBBE"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" onClick={() => sendMessage()}>
                <path d="M9.32708 9.59772L1.97831 10.3308L0.0445033 16.7123C-0.0708007 17.0896 0.0423071 17.502 0.333299 17.7604C0.62319 18.0186 1.035 18.073 1.37983 17.8997L17.485 9.85271C17.8002 9.69408 18 9.36436 18 9.0029C18 8.64146 17.8001 8.31174 17.485 8.1531L1.39079 0.100323C1.04597 -0.0730368 0.634182 -0.0186497 0.344262 0.23969C0.0532462 0.498032 -0.0598487 0.909334 0.055467 1.28665L1.98926 7.66807L9.32371 8.40229C9.6202 8.43288 9.84642 8.69009 9.84642 8.99715C9.84642 9.30422 9.62021 9.56141 9.32371 9.59201L9.32708 9.59772Z" fill="#4F545C"/>
              </svg>
            </div>
          </div>
        </div>
        {detail && (
          <DetailUserProfileFromChat {...channel.user} />
        )}
      </div>
    </div>
    
    </>
  )
}

export default observer(ChatForUser)