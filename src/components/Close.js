import React from 'react'
import {ReactComponent as CloseIcon} from "../assets/images/X.svg"
import {ReactComponent as MenuIcon} from "../assets/images/menu (1).svg"

const Close = (props) => {
    return (          
            <div onClick={props.onClick} className="h-full link-item">
                <svg className={`w-6 h-full fill-current ${props.show && 'p-0.5'}`}>
                {props.show ? <CloseIcon /> : <MenuIcon/> }
                </svg>  
            </div>
    )
}

export default Close
