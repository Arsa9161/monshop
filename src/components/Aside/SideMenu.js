import React, {useContext, useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import ProductContext from "../../context/productContext"
import SideMenuItem from './SideMenuItem';

const SideMenu = () => {
  
    const productCtx = useContext(ProductContext);

    useEffect(() => {
        productCtx.loadCategories();
    }, [])

    return (
        <div className="pl-4">
            <p className="link-item capitalize mb-3 hover:text-p-gray dark:hover:text-p-light font-medium">Төрлүүд</p> 
            {productCtx.categories.map((el,i) => <SideMenuItem key={i} befpath={''} name={el.name} sub_categories={el.categories} category_names={productCtx.CATEGORY_NAMES}/>)}
        </div>
    )
}

export default SideMenu
