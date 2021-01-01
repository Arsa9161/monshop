import React from 'react'
import { Link } from 'react-router-dom'
import LogoIcon from "../assets/images/logo.png"

const Logo = () => {
    return (
        <Link to="/" className="flex items-center bg h-14 py-1 px-5 fixed top-10 left-32 rounded-full shadow uppercase text-p-violet font-semibold z-50">
            <img src={LogoIcon} className="h-7 mr-1"/>
            <span className="text-p-pink">Mon</span>shop
        </Link>
    )
}

export default Logo
