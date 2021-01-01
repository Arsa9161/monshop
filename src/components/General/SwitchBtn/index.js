import React from 'react'
import css from "./style.module.css"

const SwitchButton = ({onClick}) => {
    return (
        <>
            <input  type="checkbox" id="switch" onClick={onClick}/><label for="switch"></label>
        </>
    )
}

export default SwitchButton
