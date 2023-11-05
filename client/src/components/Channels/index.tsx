import { FC, useState, useContext } from 'react'
import styles from "./Channels.module.scss"
import { MdGrid3X3, MdOutlineTravelExplore } from 'react-icons/md'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import { HiUsers } from 'react-icons/hi2'
import { IoIosArrowDown } from 'react-icons/io'
import IGuild from '../../interfaces/components/Guild'
import { Link } from 'react-router-dom'
import { Context } from '../../main'
import { AiOutlineClose } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'
import UserChannelsMenu from '../UserChannelsMenu'

const Channels:FC<IGuild> = (props):JSX.Element => {
  const {store} = useContext(Context)
  const [settings, setSettings] = useState(false)
  const serverData = store.user.guilds.filter(e => e._id == props.guild)
  const server = serverData[0]
  const [channel, setChannel] = useState(server.category[0].channels[0].name)

  return (
    <>
    
    <div className={styles.channels}>
      <div className={styles.top_server_info} onClick={() => setSettings(!settings)}>
        <h3>{server.name}</h3>
        {settings ? <AiOutlineClose /> : <IoIosArrowDown />}
      </div>
      {settings && (
        <div className={styles.settings}>
          <div className={styles.block}>
            <div className={styles.settings_block}>
              <h4>Буст сервера</h4>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.settings_block} onClick={() => {
              store.setInviteForm(true)
              setSettings(false)
            }}>
              <h4>Пригласить людей</h4>
            </div>
            {server.creator == store.user._id ? (
              <>       
                <div className={styles.settings_block}>
                  <h4>Настройки сервера</h4>
                </div>
                <div className={styles.settings_block}>
                  <h4>Аналитика сервера</h4>
                </div>
                <div className={styles.settings_block}>
                  <h4>Создать категорию</h4>
                </div>
                <div className={styles.settings_block}>
                  <h4>Создать событие</h4>
                </div>
              </>
            ) : ""}
            <div className={styles.settings_block}>
              <h4>Каталог приложений</h4>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.settings_block}>
              <h4>Показать все каналы</h4>
              <input type="checkbox" />
            </div>
            <div className={styles.settings_block}>
              <h4>Параметры уведомлений</h4>
            </div>
          </div>
          <div className={styles.block}>
            {server.creator == store.user._id ? (
              <>
                <div className={styles.settings_block}>
                  <h4>Изоляция сервера</h4>
                </div>
                <div className={styles.settings_block}>
                  <h4>Пожаловаться на рейд</h4>
                </div>
              </>
            ) : (
              <div className={styles.settings_block}>
                <h4>Покинуть сервер</h4>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.boost}>
        <div className={styles.text}>
          <h4>Цель:УР.2</h4>
          <p>Бусты: 2/7</p>
        </div>
        <div className={styles.progress_bar_boost}></div>
      </div>
      <div className={styles.help}>
        <div className={styles.help_text}>
          <MdOutlineTravelExplore className={styles.MdOutlineTravelExplore} />
          <h4>Путиводитель</h4>
        </div>
        <div className={styles.help_text}>
          <BsFillCalendarEventFill className={styles.BsFillCalendarEventFill} />
          <h4>Мероприятия</h4>
        </div>
        <div className={styles.help_text}>
          <MdGrid3X3 className={styles.MdGrid3X3} />
          <h4>Каналы и роли</h4>
        </div>
        <div className={styles.help_text}>
          <HiUsers className={styles.HiUsers} />
          <h4>Участники</h4>
        </div>
      </div>
      <div className={styles.channels_list}>
        {server.category.map((category, index) => (
          <div className={styles.category} key={index}>
            <div className={styles.category_name}>
              <h4>
                <IoIosArrowDown className={styles.IoIosArrowDown} /> {category.name}
              </h4>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                <path d="M6.81591 0.392578H5.56591V5.37508H0.582031V6.62508H5.56591V11.6202H6.81591V6.62508H11.8084V5.37508H6.81591V0.392578Z" fill="#B9BBBE"/>
                <path d="M7.00591 0.392578V0.202578H6.81591H5.56591H5.37591V0.392578V5.18508H0.582031H0.392031V5.37508V6.62508V6.81508H0.582031H5.37591V11.6202V11.8102H5.56591H6.81591H7.00591V11.6202V6.81508H11.8084H11.9984V6.62508V5.37508V5.18508H11.8084H7.00591V0.392578Z" stroke="#B9BBBE" strokeWidth="0.38"/>
              </svg>
            </div>  
            {category.channels.map((e, index) => (
              <Link to={`/channels/${server._id}/${category._id}/${e._id}`}>
                <div className={channel == e.name ? styles.active : styles.channel} onClick={() => setChannel(e.name)} key={index}>
                  <MdGrid3X3 className={styles.MdGrid3X3} />
                  <h4>{e.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <UserChannelsMenu />
    </div>
    
    </>
  )
}

export default observer(Channels)