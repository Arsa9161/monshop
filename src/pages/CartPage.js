import React, { useContext, useEffect, useRef } from "react";
import CartItem from "../components/CartItem";
import Back from "../components/General/Back";
import SwitchButton from "../components/General/SwitchBtn";
import Summary from "../components/Summary";
import CartContext from "../context/cartContext";

const CartPage = ({ setScrollDirection }) => {
  const cartCtx = useContext(CartContext);
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current.addEventListener("scroll", (e) =>
      handleScroll(e.target.scrollTop)
    );
  }, []);

  let lastTop = 0;
  const handleScroll = (top) => {
    if (top > lastTop) setScrollDirection("down");
    else setScrollDirection("up");

    lastTop = top;
  };

  return (
    <div className="h-screen grid grid-cols-3">
      <div className="pt-28 pb-24 col-span-1">
        <div className="h-full mx-auto flex flex-col justify-between border-r-2 border-bg-body text-lg ">
          <div className="h-5/6 px-20 pr-10 overflow-y-auto overflow-x-hidden">
            <Summary />
          </div>
          <div className="flex items-center justify-around px-4">
            <SwitchButton type="theme" />
            <Back />
          </div>
        </div>
      </div>
      <div
        ref={mainRef}
        className="py-20 col-span-2 overflow-auto flex flex-col px-10"
      >
        {cartCtx.cartList.length > 0 ? (
          cartCtx.cartList.map((el, i) => <CartItem key={i} data={el} />)
        ) : (
          <p>Таны сагс хоосон байна</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
