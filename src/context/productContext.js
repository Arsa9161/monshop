import React, {useState} from "react"
import firebase from '../firebase'

const CATEGORY_NAMES = {
    "shirt" : "Цамц",
    "t-shirt" : "Футболка",
    "pants" : "Өмд",
    "jacket" : "Гадуур хувцас",
    "home" : "Гэх ахуй",
    "tech" : "Технологи",
    "clothes" : "Хувцас",
    "beauty" : "Гоо сайхан",
    "sport" : "Спорт",
    "computer" : "Компьютер",
    "laptop" : "Зөөврийн",
    "pc" : "Суурин",
    "makeup" : "Нүүр будалт",
    "skin" : "Арьс арчилгаа",
    "hair" : "Үс арчилгаа",
    "perfume" : "Үнэртэн",
    "phone" : "Гар утас",
    "headphone" : "Чихэвч",
    "electronic" : "Цахилгаан бараа",
    "furniture" : "Тавилга",
    "clean" : "Ариутгал",
    "kitchen" : "Гал тогоо",
    "guest_room" : "Зочины өрөө",
    "basketball" : "Сагсан бөмбөг",
    "football" : "Хөл бөмбөг",
    "swim" : "Усан сэлэлт",
    "bicycle" : "Унадаг дугуй",
    "man" : "Эрэгтэй",
    "woman" : "Эмэгтэй",
}

const ProductContext = React.createContext();

export const ProductStore = (props) => {
    const [categories, setCategories] = useState([])

    const loadCategories = () => {

        const rootRef = firebase.database().ref()
        const categoryRef = rootRef.child("main_categories");

        categoryRef.once("value", snap => {
            setCategories(snap.val())
        })
    }

    return (
        <ProductContext.Provider value = {{
            categories,
            loadCategories,
            CATEGORY_NAMES
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContext
