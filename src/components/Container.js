import React from 'react'
import ItemsContainer from './Item/ItemsContainer'

const Container = ({title, data, shape}) => {

    let [point, setPoint] = React.useState(0)
    let svg

    // React.useEffect(() => {
    //     console.log(point);
    // }, [])

    if(shape == 'horizontal') {
        svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004" className="w-full h-full fill-current"><path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"/></svg>
    }
    
    const shiftRight = e => {
        setPoint(prev => prev - 300)
    }

    const shiftLeft = e => {
        setPoint(prev => prev + 300)
    }

    return (
        <div>
            <p className="mb-5 ml-6 link-item capitalize hover:text-p-gray dark:hover:text-p-light font-medium opacity-60 text-lg">{title}</p>
            {shape != 'horizontal' ? <ItemsContainer data={data}/> :
                <div className="relative mr-7 -mt-10">
                    <div className="py-10 overflow-hidden">
                        {/* <div className={`transform ${point < 0 ? `-translate-x${point}` : `translate-x-${point}`}`}> */}
                        <div style={{transform: `translateX(${point}px)`}} className="transition duration-300 ease-in-out">
                            <ItemsContainer data={data} shape={shape}/>
                        </div>
                    </div>
                    <div className="w-2 opacity-70 h-full absolute bg-gradient-to-r from-transparent to-white top-0 right-0"></div>
                    <div className="w-2 opacity-70 h-full absolute bg-gradient-to-l from-transparent to-white top-0 left-0"></div>
                    <div onClick={shiftRight} className="w-5 h-5 opacity-50 link-item cursor-pointer absolute top-1/2 -translate-y-4 -right-12">{svg}</div>
                    <div onClick={shiftLeft} className="w-5 h-5 opacity-50 link-item cursor-pointer absolute top-1/2 -translate-y-4 -left-12 transform rotate-180">{svg}</div>
                    <p className="inline-block link-item cursor-pointer absolute right-0 -bottom-2 opacity-70">Цааш үзэх...</p>
                </div>
            }
        </div>
    )
}

export default Container
