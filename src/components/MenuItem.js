import React from 'react'
import {NavLink} from "react-router-dom"

const MenuItem = (props) => {
    return (
       
        <li className="list-none">
            <NavLink exact={props.exact} activeClassName="text-p-pink dark:text-p-lightActive" to={props.link} className="flex items-center uppercase">

                <i className={props.size.width + " " + props.size.height + " mr-2"}> {props.icon}</i>
               
                {props.children}
            </NavLink>
        </li>
   
    )
}

export default MenuItem
