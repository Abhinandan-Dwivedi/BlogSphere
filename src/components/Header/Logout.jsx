import React from 'react'
import {useDispatch} from 'react-redux'
import { authservice } from '../../Appwrite/Auth' 
import {logout} from '../../store/authslice'

function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout