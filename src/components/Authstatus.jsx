import React, { useState } from 'react'
import { useEffect  } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protection({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authstate = useSelector(state => state.auth.status)

    useEffect(() => {

        if (authentication && !authstate) {
            navigate("/login")
        } else if (!authentication && authstate) {
            navigate("/")
        }
        setLoader(false)
    }, [authstate, navigate, authentication])
    return loader? <h1>Loading...</h1> : <>{children}</>
}
export default Protection;