import React from 'react'
import { useSelector } from 'react-redux'
import LoginNav from './LoginNav'
import LogoutNav from './LogoutNav'

const Navbar = () => {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    return (
        <>   
            {auth.isAuthenticated?<LoginNav /> : <LogoutNav />}
        </>
    )
}

export default Navbar
