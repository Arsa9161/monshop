import React from 'react'
import Aside from '../components/Aside/Aside'
import firebase from "../firebase"

const MainPage = () => {
    // const db = firebase.database();
    // let [arr, setArr] = React.useState([]);
    // db.ref("products/clothes").once("value", snap => {
    //     const data = snap.val();
    //     setArr(Object.entries(data)) 
    // })

    return (
        <div className="w-full h-full grid grid-flow-col grid-cols-11">
            <div className="col-span-2 h-full mt-24">
                <Aside />
            </div>
            <div className="col-span-9 h-full  overflow-y-scroll overflow-x-hidden">

            </div>
        </div>
    )
}

export default MainPage
