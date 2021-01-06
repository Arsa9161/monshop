import React, {useContext, useState, useEffect} from 'react'
import ProductContext from "../../context/productContext"
import SideMenuItem from './SideMenuItem';

const SideMenu = () => {
    const productCtx = useContext(ProductContext);

    useEffect(() => {
        productCtx.loadCategories();
    }, [])

    return (
        <div className="h-full">
            <p className="link-item capitalize hover:text-p-gray dark:hover:text-p-light">Төрлүүд</p> 
            {productCtx.categories.map(el => <SideMenuItem befpath={''} name={el.name} sub_categories={el.categories} category_names={productCtx.CATEGORY_NAMES} />)}
        </div>
    )
}

export default SideMenu
