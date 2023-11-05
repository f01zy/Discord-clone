import { FC, useContext } from 'react'
import styles from "./Servers.module.scss"
import { BsDiscord } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineDownload } from 'react-icons/ai'
import { FaCompass } from 'react-icons/fa6'
import server_1 from '../../assets/servers/server-1.png'
import { Link } from 'react-router-dom'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'

const Servers:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  return (
    <>
    
    <div className={styles.servers}>
      <div className={styles.dis_btn}>
        <Link to="/channels/@me"><button><BsDiscord className={styles.BsDiscord} /></button></Link>
      </div>
      <div className={styles.servers_buttons}>
        {store.user.guilds.map((e, index) => (
          <div className={styles.button} key={index}>
            <Link to={`/channels/${e._id}/${e.category[0]._id}/${e.category[0].channels[0]._id}`}><button><img src={server_1} /></button></Link>
          </div>
        ))}
      </div>
      <div className={styles.bottom_btns}>
        <div className={styles.button}>
          <button onClick={() => store.setCreateForm(true)}><AiOutlinePlus className={styles.AiOutlinePlus} /></button>
        </div>
        <div className={styles.button}>
          <button><FaCompass className={styles.FaCompass} /></button>
        </div>
        <div className={styles.button}>
          <button><AiOutlineDownload className={styles.AiOutlineDownload} /></button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default observer(Servers)