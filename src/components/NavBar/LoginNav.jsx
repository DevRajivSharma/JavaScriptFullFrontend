import React, { useEffect,useState } from 'react'
import { useSelector } from'react-redux'
import logo from '../../assets/youtubeCloneLogo.png'
const LoginNav = () => {
    const [profileImg, setProfileImg] = useState('')
    const [userName, setUserName] = useState('')
    const auth = useSelector(state => state.auth)
    useEffect(()=>{
        if(auth.user){
            setProfileImg(auth.user.avatar) 
            setUserName(auth.user.userName)
        }
    })
    if(profileImg){
    return (
        <div className='flex px-10 justify-between  items-center w-screen border-1 border-amber-50'>
            <img src={logo} alt="Logo" width={50}/>

            <div className='flex gap-1 items-center'>
                <span className='text-white'>{userName}</span>
                <img src={profileImg} width={30} height={20} alt="Profile" 
                className='object-cover rounded-full '
                style={{width:'40px',height:'40px'}}/>
            </div>
        </div>
    )
}
}

export default LoginNav
