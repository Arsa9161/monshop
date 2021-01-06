import React from 'react'
import css from "./style.module.css"

const SwitchButton = ({onClick}) => {
    return (
        <div className={css.SwitchBtn}>
            <input  type="checkbox" id="switch" onClick={onClick}/><label htmlFor="switch"></label>
        </div>
    )
}

export default SwitchButton
