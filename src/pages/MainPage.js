import React, {useContext, useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'
import Aside from '../components/Aside/Aside'
import Container from '../components/Container'
import ProductContext from "../context/productContext"

const MainPage = () => {
    // const db = firebase.database();
    // let [arr, setArr] = React.useState([]);
    // db.ref("products/clothes").once("value", snap => {
    //     const data = snap.val();
    //     setArr(Object.entries(data)) 
    // })
    const productCtx = useContext(ProductContext);
    useEffect(() => {
        productCtx.loadProductsByKey('clothes', 'NEW_PRODUCTS')
        productCtx.loadProductsByKey('clothes', 'SPECIAL_PRODUCTS')
    }, [])

    return (
        <div className="w-full h-full grid grid-flow-col grid-cols-11">
            <div className="col-span-2 h-full mt-28">
                <Aside />
            </div>
            <div className="col-span-9 h-full overflow-y-auto overflow-x-hidden px-20 py-28">
                <div className="w-full">
                    <Switch>
                        <Route path='/:category'>
                            <Container title={"Онцлох"} shape={'horizontal'} data={productCtx.specialProducts}/>
                            <Container title={"Шинэ"} shape={'horizontal'} data={productCtx.newProducts}/>
                        </Route>
                        <Route exact path='/'>
                            <Container title={"Төрлүүд"} data={productCtx.categories}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default MainPage
