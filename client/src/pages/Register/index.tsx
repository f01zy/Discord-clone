import { Link, Navigate } from "react-router-dom"
import styles from "./Register.module.scss"
import { FC, useContext } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import { SubmitHandler, useForm } from "react-hook-form"
import IRegister from "../../interfaces/forms/register/Register"
import { AxiosError } from "axios"
import IData from "../../interfaces/forms/login/Data"

const Register:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    setError
  } = useForm<IRegister>({
    mode: "onChange"
  })

  const onSubmit:SubmitHandler<IRegister> = async data => {
    const isSuccess = await store.register(data.username, data.email, data.password)

    if(isSuccess as AxiosError) {
      const data:IData = isSuccess?.response?.data as IData
      console.log(data.message);

      switch(data.message) {
        case "Пользователь с таким email уже сушествует":
          setError("email", {type: "email is not valid", message: "Пользователь с таким email уже сушествует"})
          break

        case "Пользователь с таким username уже сушествует":
          setError("username", {type: "username is not valid", message: "Пользователь с таким username уже сушествует"})
            break
      }
    }
  }

  if(store.isAuth) {
    return <Navigate to="/channels/@me" />
  }

  return (
    <>
    
      <div className={styles.register}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Создать учетную запись</h2>
            <div className={errors.email?.message ? styles.input_error : styles.input}>
              <p>Email{errors.email?.message ? <span> - {errors.email?.message}</span> : ""}</p>
              <input type="text" {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: "Введите валидный email",
                }
              })} />
            </div>
            <div className={errors.username?.message ? styles.input_error : styles.input}>
              <p>Отображаемое имя{errors.username?.message ? <span> - {errors.username?.message}</span> : ""}</p>
              <input type="text" {...register("username", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9_-]{4,15}$/,
                  message: "Username может содержать только буквы, цифры и некоторые специальные символы, такие как «_» и «-»"
                }
              })} />
            </div>
            <div className={errors.password?.message ? styles.input_error : styles.input}>
              <p>Пароль{errors.password?.message ? <span> - {errors.password?.message}</span> : ""}</p>
              <input type="password" {...register("password", {
                required: true,
                pattern: {
                  value: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?-_"]).*$/,
                  message: "Ненадёжный пароль"
                }
              })} />
            </div>
            <div className={styles.checkbox}>
              <input type="checkbox" />
              <p>Я не против получать  электронные письма с новостями discord, советами и специальными предложениями. От рассылки можно отписаться в любое время</p>
            </div>
            <div className={styles.button}>
              <button type="submit" disabled={!isValid}>Продолжить</button>
              <p>Регистрируясь, вы соглашаетесь с <Link to="/">Условиями использования</Link> и <Link to="/">Политикой конфидициальности</Link> Discord</p>
            </div>
            <div className={styles.login_link}>
              <Link to="/login">Уже зарегистрированы?</Link>
            </div>
          </form>
        </div>
      </div>
    
    </>
  )
}

export default observer(Register)