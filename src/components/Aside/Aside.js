import React from 'react'
import Back from '../General/Back'
import SwitchButton from '../General/SwitchBtn'
import SideMenu from './SideMenu'

const Aside = () => {
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        console.log(document.documentElement)
    }
    return (
        <div className="w-full h-full pb-10 ">
            <div className="h-3/4 overflow-y-scroll overflow-x-hidden pl-4 ">
                <SideMenu />
            </div>
            <div className="flex items-center space-x-12 ">
                <SwitchButton onClick={toggleTheme}/>
                <Back />
            </div>
        </div>
    )
}

export default Aside
