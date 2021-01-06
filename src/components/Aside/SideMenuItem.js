import React, {useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const SideMenuItem = (props) => {

    console.log(useHistory().location.pathname);
    const [isShow, setIsShow] = useState(false)
    const history = useHistory();

    const toggleShow = (e) => {
        setIsShow(prev => !prev)
    }

    const svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004" className="w-full h-full fill-current"><path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"/></svg>

    return (
        <div>
            <NavLink to={props.befpath + "/" + props.name} activeClassName="text-p-pink dark:text-p-lightActive" 
             onClick={toggleShow} className={`flex items-center link-item capitalize`}>

                <i className={`w-3 h-3 mr-3 ${isShow && 'transform rotate-90'}`}>{svg}</i>
                {props.category_names[props.name]}

            </NavLink>
            
            {isShow && props.sub_categories &&
                <div className="flex flex-col relative left-5">
                    {props.sub_categories.map(el => <SideMenuItem to={props.befpath + "/" + props.name + "/" + el.name} name={el.name} sub_categories={el.sub_categories}
                    category_names={props.category_names}/>)}
                </div>
            }
        </div>
    )
}

export default SideMenuItem
