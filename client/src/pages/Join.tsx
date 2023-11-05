import { FC, useEffect, useContext } from 'react'
import { Context } from '../main'
import { Navigate, useParams } from 'react-router-dom'

const Join:FC = ():JSX.Element => {
  const {store} = useContext(Context)
  const params = useParams()

  useEffect(() => {
    store.join(String(params.link))
  }, [])
  
  return <Navigate to="/login" />
}

export default Join