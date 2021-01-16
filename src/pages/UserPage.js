import React, { useRef, useEffect, useContext } from "react";

import User from "../components/User";
import WishItem from "../components/WishItem";
import UserContext from "../context/UserContext";

const UserPage = ({ match, setScrollDirection }) => {
  const userCtx = useContext(UserContext);
  const mainRef = useRef(null);

  const tab = match.params.tab;

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
    <div className="w-full h-full grid grid-flow-col grid-cols-11">
      <div className="col-span-2 h-full mt-32">
        <User />
      </div>
      <div
        className="col-span-9 h-full overflow-y-auto overflow-x-hidden px-10 py-24 grid grid-cols-2 gap-x-14"
        ref={mainRef}
      >
        {tab == "wishlist" ? (
          userCtx.wishList.length > 0 ? (
            userCtx.wishList.map((el, i) => (
              <WishItem
                key={i}
                product={el}
                removeFromWishList={userCtx.removeFromWishList}
              />
            ))
          ) : (
            <p>Уучлаарай таны хүслийн жагсаалт хоосон байна.</p>
          )
        ) : tab == "history" ? (
          userCtx.purchaseHistory.length > 0 ? (
            userCtx.purchaseHistory.map((el, i) => <div>s</div>)
          ) : (
            <p>Уучлаарай таны захиалга хоосон байна.</p>
          )
        ) : (
          "Алдаа"
        )}
      </div>
    </div>
  );
};

export default UserPage;
