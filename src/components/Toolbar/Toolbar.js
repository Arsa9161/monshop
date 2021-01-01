import React, {useState, useEffect} from 'react'
//
import MenuItems from './MenuItems'
import Search from './Search'
import Close from "./Close"

const Toolbar = () => {
    const [show, setShow] = useState(true)

    const toggleToolbar = () => {
        setShow(prevShow => !prevShow)
    }
 
    return (
        <div className="bg  h-14 flex items-center py-4 px-4 fixed top-10 right-32 rounded-full shadow z-50">
            <div className="h-5 flex items-center space-x-5 text-p overflow-y-hidden select-none">
           
                {show &&
                    <>
                        <Search/>        
                        <MenuItems />
                    </>
                }

                <Close show={show} onClick={toggleToolbar}/>
            </div>
        </div>
    )
}

export default Toolbar
