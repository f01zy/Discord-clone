import { FC, useState, useContext } from 'react'
import styles from "./Settings.module.scss"
import SettingsJson from "../../maps/Settings.json"
import MyAccount from './MyAccount'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'

const Settings:FC = ():JSX.Element => {
  const {store} = useContext(Context)
  const [page, setPage] = useState("Моя учетная запись")

  return (
    <>
    
    <div className={styles.settings}>
      <aside>
        <div className={styles.blocks}>
          {SettingsJson.map((e, index) => (
            <div className={styles.aside_relative_block} key={index}>
              <div className={styles.name_block}>
                <h3>{e.name}</h3>
              </div>
              {e.blocks.map((e, index) => (
                <div className={styles.aside_block} key={index}>
                  <h4 onClick={() => setPage(e.name)}>{e.name}</h4>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.aside_relative_block}>
            <div className={styles.aside_block} onClick={() => {
              store.logout()
              store.setSettingsMenu(false)
            }}>
              <h4>Выйти</h4>
            </div>
          </div>
        </div>
      </aside>
      {page == "Моя учетная запись" && (
        <MyAccount />
      )}
    </div>
    
    </>
  )
}

export default observer(Settings)