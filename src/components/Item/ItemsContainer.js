import React from 'react'
import ProductContext from '../../context/productContext'
import Item from "./Item"

const ItemsContainer = ({data, shape}) => {
    const productCtx = React.useContext(ProductContext)

    const convertTugrug = price => {
        // let arr = price.split('');

        return price + '₮'
    }

    return (
        <div className={`${shape == 'horizontal' ? 'flex flex-row space-x-10' : 'grid grid-flow-row grid-cols-3 gap-y-16 gap-x-3 justify-items-center'}`}>
            {data.map( (el,i) => (
                <Item key={i} data={el} befPath={''}>
                    {!el.price ? 
                    <p className="main-text my-4 capitalize text-lg">{productCtx.CATEGORY_NAMES[el.name]}</p> 
                    :
                    <div className="w-full flex justify-around items-center px-5 py-4">
                        <div className="w-1/2 overflow-hidden">
                            <p className="main-text text-xs opacity-70">{el.brand}</p>
                            <p className="main-text text-lg">{el.name}</p>
                        </div>
                        <div className="flex flex-col items-end overflow-hidden">
                            {el.price - el.total_price > 0 && <p className="main-text line-through text-sm opacity-70">{convertTugrug(el.price)}</p>}
                            <p className="main-text text-p-violet text-xl">{convertTugrug(el.total_price)}</p>
                        </div>
                    </div>
                    }
                </Item>
            ))}
        </div>
    )
}

export default ItemsContainer
