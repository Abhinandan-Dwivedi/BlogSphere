
import React from 'react'
import { useDispatch } from 'react-redux'
import { authservice } from '../../Appwrite/Auth'
import { logout } from '../../store/authslice'

function Logout() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?')

        if (confirmLogout) {
            authservice.logout().then(() => {
                dispatch(logout())
            })
        }
    }

    return (
        <button
            className="group relative overflow-hidden rounded-full border border-red-500/30 bg-red-500/10 px-6 py-2 text-sm font-semibold text-red-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/50 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] active:scale-95"
            onClick={logoutHandler}
        >

            <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-400/20" />


            <span className="absolute -left-12 top-0 h-full w-8 rotate-12 bg-white/10 blur-md transition-all duration-700 group-hover:left-[120%]" />


            <span className="relative z-10">Logout</span>


            <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-red-400 to-pink-400 transition-all duration-300 group-hover:w-3/4" />
        </button>
    )
}

export default Logout