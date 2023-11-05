import { FC, useState, useContext } from 'react'
import styles from "./Create.module.scss"
import { IoIosArrowForward } from 'react-icons/io'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import my from '../../assets/patterns/my.svg'
import game from '../../assets/patterns/game.svg'
import school from '../../assets/patterns/school.svg'
import group from '../../assets/patterns/group.svg'
import club from '../../assets/patterns/club.svg'
import friends from '../../assets/patterns/friends.svg'
import { AiOutlineClose } from 'react-icons/ai'

const Create:FC = ():JSX.Element => {
  const {store} = useContext(Context)
  const [step, setStep] = useState(1)
  const [server, setServer] = useState(`Сервер ${store.user.username}`)

  return (
    <>
    <div className={styles.create}>
      <div className={styles.form}>
        <div className={styles.close} onClick={() => store.setCreateForm(false)}>
          <AiOutlineClose />
        </div>
        {step == 1 && (
          <div className={styles.pattern}>
            <h2>Создайте сервер</h2>
            <h5>Ваш сервер - это место, где вы можете тусоваться<br />со своими друзьями. Создате свой сервер и начните общаться.</h5>
            <div className={styles.patterns}>
              <div className={styles.item} onClick={() => setStep(2)}>
                <div className={styles.text}>
                  <img src={my} />
                  <h3>Свой шаблон</h3>
                </div>
                <IoIosArrowForward />
              </div>
              <p>Начните с шаблона</p>
              <div className={styles.item} onClick={() => setStep(2)}>
                <div className={styles.text}>
                  <img src={game} />
                  <h3>Игры</h3>
                </div>
                <IoIosArrowForward />
              </div>
              <div className={styles.item} onClick={() => setStep(2)}>
                <div className={styles.text}>
                  <img src={school} />
                  <h3>Школьный круб</h3>
                </div>
                <IoIosArrowForward />
              </div>
              <div className={styles.item} onClick={() => setStep(2)}>
                <div className={styles.text}>
                  <img src={group} />
                  <h3>Учебная группа</h3>
                </div>
                <IoIosArrowForward />
              </div>
            </div>
            <div className={styles.invite}>
              <h4>У вас уже есть приглашение?</h4>
              <button onClick={() => setStep(4)}>Присоединится к серверу</button>
            </div>
          </div>
        )}
        {step == 2 && (
          <div className={styles.for}>
            <h2>Раскажите нам о вашем сервере</h2>
            <p>Чтобы мы смогли помочь вам с настройкой, скажите, для кого предназначен ваш сервер: для друзей или большого сообщества?</p>
            <div className={styles.fors}>
              <div className={styles.item} onClick={() => setStep(3)}>
                <div className={styles.text}>
                  <img src={club} />
                  <h3>Для клуба или сообщества</h3>
                </div>
                <IoIosArrowForward />
              </div>
              <div className={styles.item} onClick={() => setStep(3)}>
                <div className={styles.text}>
                  <img src={friends} />
                  <h3>Для меня и друзей</h3>
                </div>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        )}
        {step == 3 && (
          <div className={styles.info}>
            <h2>Персонализируйте свой сервер</h2>
            <p>Персонализируйте свой новый сервер, выбрав ему название и значек. Их можно будет изменить в любой момент</p>
            <div className={styles.input}>
              <h4>Название сервера</h4>
              <input type="text" defaultValue={`Сервер ${store.user.username}`} onChange={e => setServer(e.target.value)} />
            </div>
            <h5>Создавая сервер, вы соглашаетесь с <Link to="/">Правилами Сообщества</Link> Discord</h5>
          </div>
        )}
        {step == 4 && (
          <div className={styles.join_menu}>
            <h2>Присоединится к серверу</h2>
            <p>Введите приглашение, чтобы присоединится к существующему серверу</p>
            <div className={styles.input}>
              <h4>Ссылка-приглашение</h4>
              <input type="text" />
            </div>
            <div className={styles.example}>
              <h4>Приглашения должны выглядеть так:</h4>
              <h5>hTKzmak</h5>
              <h5>https://discord.gg/hTKzmak</h5>
              <h5>https://discord.gg/cool-people</h5>
            </div>
          </div>
        )}
        {step > 1 && (
          <div className={styles.back}>
            <p onClick={() => {
              if(step == 4) {
                setStep(step - 3)
              } else {
                setStep(step - 1)
              }
            }}>Назад</p>
            {step == 3 && (
              <button onClick={() => {
                store.create(server)
                store.setCreateForm(false)
              }}>Создать</button>
            )}
            {step == 4 && (
              <button onClick={() => {
                store.setCreateForm(false)
              }}>Присоединится к серверу</button>
            )}
          </div>
        )}
      </div>
    </div>
    
    </>
  )
}

export default Create