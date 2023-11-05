import { FC, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { observer } from 'mobx-react-lite'
import { useForm, SubmitHandler } from 'react-hook-form'
import ILogin from '../../interfaces/forms/login/Login'
import { Context } from '../../main'
import { AxiosError } from 'axios'
import IData from '../../interfaces/forms/login/Data'

const Login:FC = ():JSX.Element => {
  const {store} = useContext(Context)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILogin>()

  const onSubmit:SubmitHandler<ILogin> = async data => {
    const isSuccess = await store.login(data.email, data.password)

    if(isSuccess as AxiosError) {
      const data:IData = isSuccess?.response?.data as IData
      console.log(data.message);

      switch(data.message) {
        case "Пользователь с таким email не найден":
          setError("email", {type: "email not found", message: "Неверные данные для входа или пароль"})
          setError("password", {type: "Invalid password", message: "Неверные данные для входа или пароль"})
          break
        
        case "Неверный пароль":
          setError("email", {type: "email not found", message: "Неверные данные для входа или пароль"})
          setError("password", {type: "Invalid password", message: "Неверные данные для входа или пароль"})
          break
      }
    }
  }

  if(store.isAuth) {
    return <Navigate to="/channels/@me" />
  }

  return (
    <>
    
      <div className={styles.login}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>С возвращением!</h2>
            <h3>Мы так рады видеть вас снова!</h3>
            <div className={errors.email?.message ? styles.input_error : styles.input}>
              <p>Адрес электронной почты или номер телефона{errors.email?.message ? <span> - {errors.email?.message}</span> : ""}</p>
              <input type="email" {...register("email", {
                required: true,
                // pattern: {
                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                //   message: "Введите валидный email"
                // }
              })} />
            </div>
            <div className={errors.password?.message ? styles.input_error : styles.input}>
              <p>Пароль{errors.password?.message ? <span> - {errors.password?.message}</span> : ""}</p>
              <input type="password" {...register("password", {
                required: true,
              })} />
              <Link to="/">Забыли пароль?</Link>
            </div>
            <div className={styles.button}>
              <button type='submit'>Вход</button>
            </div>
            <div className={styles.register_link}>
              <p>Нужна учетная запись? <Link to="/register">Зарегистрироваться</Link></p>
            </div>
          </form>
        </div>
      </div>
    
    </>
  )
}

export default observer(Login)