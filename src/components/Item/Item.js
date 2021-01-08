import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
    return (
        <Link to={props.befPath + props.data.name}>
            <div className="transform hover:scale-105 transition duration-300 w-64 h-64 overflow-hidden rounded-30 shadow-md flex flex-col items-center hover:shadow-xl ">
                <div className="w-full h-3/4 overflow-hidden">
                    <div className="transform hover:scale-110 transition duration-400 w-full h-full bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${props.data.img.large})`}}>
                    </div>
                    {/* <img src={`${props.img.small} 240w, ${props.img.medium} 480w ${props.img.large} 640w`} alt="" className=" hover:scale-105"/> */}
                </div>
                {props.children}
            </div>
        </Link>
    )
}

export default Item
