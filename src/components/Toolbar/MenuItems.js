import React, {useState} from 'react'
import MenuItem from "./MenuItem"

const MenuItems = () => {
    const [size, setSize] = useState({width: 'w-5',height : 'h-5'})

    const bagIcon = <svg className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208.955 208.955"><path d="M190.85 200.227L178.135 58.626a7.5 7.5 0 00-7.47-6.829h-26.221V39.971c0-22.04-17.93-39.971-39.969-39.971-22.038 0-39.966 17.931-39.966 39.971v11.826H38.27a7.5 7.5 0 00-7.47 6.829L18.035 200.784a7.5 7.5 0 007.47 8.17h157.946a7.5 7.5 0 007.399-8.727zM79.509 39.971c0-13.769 11.2-24.971 24.967-24.971 13.768 0 24.969 11.202 24.969 24.971v11.826H79.509V39.971zm-45.8 153.984L45.127 66.797h19.382v13.412a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5V66.797h49.936v13.412a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5V66.797h19.364l11.418 127.158H33.709z"/></svg>

    const cartIcon = <svg className="w-full h-full fill-current" viewBox="0 -31 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0014.422-10.879l60-210a15.003 15.003 0 00-2.445-13.152A15.006 15.006 0 00497 60H130.367l-10.722-48.254A15.003 15.003 0 00105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zm0 0M150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0M362 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"/></svg>
    
    const loginIcon = <svg className="w-full h-full fill-current" viewBox="0 -32 512.016 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 213.34c-58.816 0-106.668-47.848-106.668-106.664C85.332 47.859 133.184.008 192 .008s106.668 47.851 106.668 106.668c0 58.816-47.852 106.664-106.668 106.664zm0-181.332c-41.172 0-74.668 33.492-74.668 74.668 0 41.172 33.496 74.664 74.668 74.664s74.668-33.492 74.668-74.664c0-41.176-33.496-74.668-74.668-74.668zm0 0M368 448.008H16c-8.832 0-16-7.168-16-16V357.34c0-55.871 45.46-101.332 101.332-101.332h181.336c55.871 0 101.332 45.46 101.332 101.332v74.668c0 8.832-7.168 16-16 16zm-336-32h320V357.34c0-38.227-31.105-69.332-69.332-69.332H101.332C63.105 288.008 32 319.113 32 357.34zm0 0M496 218.676H314.668c-8.832 0-16-7.168-16-16s7.168-16 16-16H496c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0"/><path d="M410.668 304.008a15.89 15.89 0 01-11.309-4.692c-6.25-6.253-6.25-16.386 0-22.636l74.028-74.028-74.028-74.027c-6.25-6.25-6.25-16.383 0-22.633s16.383-6.25 22.637 0l85.332 85.332c6.25 6.25 6.25 16.387 0 22.637l-85.332 85.332a15.902 15.902 0 01-11.328 4.715zm0 0"/></svg>
    return (
        <nav className="border-l border-r border-current">
            <ul className="flex space-x-5 px-5">    
                <MenuItem link="/" icon={bagIcon} size={size}>Дэлгүүр</MenuItem> 
                <MenuItem link="/cart" icon={cartIcon} size={size}>Сагс</MenuItem>
                <MenuItem link="/login" icon={loginIcon} size={size}>Нэвтрэх</MenuItem>
            </ul>
        </nav>
    )
} 

export default MenuItems
