import React from 'react'
import Aside from '../components/Aside/Aside'

const MainPage = () => {
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
