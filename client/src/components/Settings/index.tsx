import { FC, useState } from 'react'
import styles from "./Settings.module.scss"
import SettingsJson from "../../maps/Settings.json"
import MyAccount from './MyAccount'

const Settings:FC = ():JSX.Element => {
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
            <div className={styles.aside_block}>
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

export default Settings