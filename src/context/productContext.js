import React, { useState } from "react";
import firebase from "../firebase";

const CATEGORY_NAMES = {
  shirt: "Цамц",
  "t-shirt": "Футболка",
  pants: "Өмд",
  jacket: "Гадуур хувцас",
  home: "Гэх ахуй",
  tech: "Технологи",
  clothes: "Хувцас",
  beauty: "Гоо сайхан",
  sport: "Спорт",
  computer: "Компьютер",
  laptop: "Зөөврийн",
  pc: "Суурин",
  makeup: "Нүүр будалт",
  skin: "Арьс арчилгаа",
  hair: "Үс арчилгаа",
  perfume: "Үнэртэн",
  phone: "Гар утас",
  headphone: "Чихэвч",
  electronic: "Цахилгаан бараа",
  furniture: "Тавилга",
  clean: "Ариутгал",
  kitchen: "Гал тогоо",
  guest_room: "Зочины өрөө",
  basketball: "Сагсан бөмбөг",
  football: "Хөл бөмбөг",
  swim: "Усан сэлэлт",
  bicycle: "Унадаг дугуй",
  man: "Эрэгтэй",
  woman: "Эмэгтэй",
};

const ProductContext = React.createContext();

export const ProductStore = (props) => {
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (loading) {
      if (newProducts.length > 0 && specialProducts.length > 0) {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }
    }
  }, [newProducts, specialProducts]);

  const loadCategories = () => {
    setLoading(true);
    const rootRef = firebase.database().ref();
    const categoryRef = rootRef.child("main_categories");

    categoryRef
      .once("value", (snap) => {
        setCategories(snap.val());
      })
      .finally(() => setLoading(false));
  };
  const loadCategory = (category) => {
    loadProductsByKey(category, "NEW_PRODUCTS");
    loadProductsByKey(category, "SPECIAL_PRODUCTS");
  };

  const loadProductsByKey = (category, key) => {
    setLoading(true);
    const rootRef = firebase.database().ref();
    const categoryRef = rootRef.child("products/" + category);

    switch (key) {
      case "NEW_PRODUCTS":
        const query_new = categoryRef.limitToLast(10);
        query_new.once("value", (snap) => {
          let objects = snap.val();
          if (objects) {
            let data = [];
            let keys = Object.keys(objects);
            keys.forEach((key) => data.push(objects[key]));

            setNewProducts(data);
          } else {
            setNewProducts(["null"]);
          }
        });

      case "SPECIAL_PRODUCTS":
        const query_special = categoryRef
          .orderByChild("isSpecial")
          .equalTo("true")
          .limitToLast(10);
        query_special.once("value", (snap) => {
          let objects = snap.val();
          if (objects) {
            let data = [];
            let keys = Object.keys(objects);
            keys && keys.forEach((key) => data.push(objects[key]));

            setSpecialProducts(data);
          } else {
            setSpecialProducts(["null"]);
          }
        });
    }
  };
  return (
    <ProductContext.Provider
      value={{
        loading,
        categories,
        newProducts,
        specialProducts,
        loadCategories,
        loadCategory,
        CATEGORY_NAMES,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
