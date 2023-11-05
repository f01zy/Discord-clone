import { FC, useContext } from 'react'
import styles from "./MyAccount.module.scss"
import { Context } from '../../../main'

const MyAccount:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  return (
    <>
    
    <div className={styles.myAccount}>
      <div className={styles.close} onClick={() => store.setSettingsMenu(false)}>
        <div className={styles.circle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill='#B9BBBE'><path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
        </div>
        <p>Esc</p>
      </div>
      <div className={styles.content}>
        <div className={styles.setting_block_one}>
          <h3>Моя учетная запись</h3>
          <div className={styles.user}>
            <div className={styles.banner}>

            </div>
            <div className={styles.user_top_info}>
              <div className={styles.avatar}>

              </div>
              <h4>{store.user.username}</h4>
              <button>Редактировать профиль пользователя</button>
            </div>
            <div className={styles.edit_container}>
              <div className={styles.edit}>
                <div className={styles.edit_block}>
                  <div className={styles.edit_block_info}>
                    <h4>Имя пользователя</h4>
                    <p>{store.user.username}</p>
                  </div>
                  <button>Изменить</button>
                </div>
                <div className={styles.edit_block}>
                  <div className={styles.edit_block_info}>
                    <h4>Электронная почта</h4>
                    <p>{store.user.email}</p>
                  </div>
                  <button>Изменить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.setting_block_two}>
          <h3>Пароль и аунтификация</h3>
          <button>Изменить пароль</button>
          <div className={styles.block}>
            <h5>Приложение для аунтефикации</h5>
            <p>Защитите свою учётную запись Discord дополнительным уровнем безопасности. После настройки
для входа вам будет необходимо ввести пароль и пройти дополнительную меру безопасности.</p>
            <button>Включить приложение для аунтефикации</button>
          </div>
          <div className={styles.block}>
            <h5>Ключи безопасности</h5>
            <p>Обеспечьте дополнительную защиту своей учётной записи с помощью ключа безопасности.</p>
            <button>Зарегистрировать ключ безопасности</button>
          </div>
        </div>
        <div className={styles.setting_block_three}>
          <h5>Удаление учетной записи</h5>
          <p>Отключив учетную запись, вы в любой момент сможете востановить её.</p>
          <div className={styles.delete_buttons}>
            <button>Отключить учетную запись</button>
            <button>Удалить уч. запись</button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default MyAccount