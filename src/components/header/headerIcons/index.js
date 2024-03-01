import React from "react";
import { Favourite, Profile, cart } from "../../../assets/svgIcons";
import "./style.css";
import UseCartFavourite from "../../../hooks/useCartFavourite";
import { useNavigate } from "react-router-dom";
const HeaderIcons = () => {
  const { cart: cart_2, favourite, totalPrice } = UseCartFavourite();
  const navigate = useNavigate();
  return (
    <div className="HeaderIcons">
      <span onClick={() => navigate("/Cart")}>
        {totalPrice > 0 ? <sub>{totalPrice}$</sub> : null}
        {cart}
        {cart_2?.length > 0 ? <sup>{cart_2?.length}</sup> : null}
      </span>
      <span onClick={() => navigate("/Favourite")}>
        {Favourite}
        {favourite?.length > 0 ? <sup>{favourite?.length}</sup> : null}
      </span>
      <span
        onClick={() =>
          navigate(
            localStorage?.getItem("GreenTreesToken") ? "/profile" : "/login"
          )
        }
      >
        {Profile}
      </span>
    </div>
  );
};

export default HeaderIcons;
