import React from 'react'
import { useHistory } from "react-router-dom";
const Back = () => {
    const history = useHistory();
    return (
        <button onClick={() => history.goBack()} className="text-p-gray hover:text-p-violet">
            Буцах
        </button>
    )
}

export default Back
