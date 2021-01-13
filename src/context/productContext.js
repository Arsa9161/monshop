import React, { useState, useEffect } from "react";
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
  const [productDetail, setProductDetail] = useState({
    mainProduct: {},
    sameProducts: [],
  });

  useEffect(() => {
    if (loading) {
      if (newProducts.length > 0 && specialProducts.length > 0) {
        setLoading(false);
      }
    }
  }, [newProducts, specialProducts]);

  const loadProductDetail = (product_code, category) => {
    setLoading(true);
    const rootRef = firebase.database().ref();
    const productRef = rootRef.child("products/" + category);
    let arr = product_code.split("-");
    let query;
    if (arr.length > 2) {
      let [first, second] = arr;
      let code = first + "-" + second;
      query = productRef
        .orderByChild("product_code")
        .startAt(code)
        .endAt(code + "utf8ff");
    } else
      query = productRef.orderByChild("product_code").equalTo(product_code);

    query
      .once("value", (snap) => {
        console.log(snap.val());
        let data = snap.val();
        let keys = Object.keys(data);
        let state = {
          mainProduct: {},
          sameProducts: [],
        };

        keys.forEach((key) => {
          if (data[key].product_code === product_code)
            state.mainProduct = data[key];
          else state.sameProducts.push(data[key]);
        });
        setProductDetail(state);
      })
      .finally(() => setLoading(false));
  };

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
        productDetail,
        loadProductDetail,
        loadCategories,
        loadCategory,
        loadProductDetail,
        CATEGORY_NAMES,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
