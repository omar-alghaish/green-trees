import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../../assets/svgIcons";
import UseCartFavourite from "../../hooks/useCartFavourite";
import UseGeneral from "../../hooks/useGeneral";
import Options from "../options/options";
import PopUp from "../popup";
import "./style.css";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
const Product = ({
  item,
  id,
  color,
  image,
  title,
  price,
  isDetailed,
  getData,
  discount,
  discountRatio,
}) => {
  const localData = localStorage.getItem("green_trees");
  const userId = localData && JSON.parse(localData);
  const {
    isItemInCart,
    addItemToCart,
    isItemInFavourite,
    removeFromFavourite,
    cart,
    addToFavourite,
    removeItemFromCart,
  } = UseCartFavourite();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const { language } = UseGeneral();
  const location = useLocation();
  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);
  const [choosedOption, setChoosedOptions] = useState([]);
  const [searchParams] = useSearchParams();
  const addToFav = () => {
    setLoading(true);
    Axios({
      url: BASE_URL + `favorits/change_product_in_fav`,
      method: "post",
      data: {
        user_favorit_id: userId,
        product_favorit_id: id,
        // has_option:0
      },
    })
      .then((res) => {
        // console.log(res)
        if (res.status == "success") {
          toast.success(res.message);
          getData();
          // getItmData()
        } else if (res.status == "faild") {
          toast.error(res.message);
        } else {
          toast.error(language == "ar" ? "حدث خطأ ما" : "Something Error");
        }
        // console.log(res)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeQuan = (quan, id) => {
    let newOptions = [...options];
    for (let i = 0; i < newOptions.length; i++) {
      if (newOptions[i].id == id) {
        newOptions[i]["quantity"] = quan;
      }
      setOptions(newOptions);
    }
    // setOptions
  };

  const handleInCart = () => {
    // console.log('erer')
    setCartLoading(true);
    const data_send = {
      product_id: id,
      product_count: 1,
      has_option: 0,
      // product_options:0,
    };
    Axios({
      url: BASE_URL + `cart/add_to_cart`,
      method: "post",
      data: data_send,
    })
      .then((res) => {
        console.log(res);
        if (res.status == "success") {
          toast.success(res.message);
          getData();
          // getItmData()
        } else {
          toast.error(res.message);
        }
        // else if(res.message)
      })
      .finally(() => {
        setLoading(false);
        setCartLoading(false);
      });
  };

  const addToCartWithOptions = () => {
    let optionList = [...options];
    setCartLoading(true);
    let product_options = "";
    for (let i = 0; i < optionList.length; i++) {
      if (optionList[i].quantity != 0) {
        if (product_options.length == 0) {
          product_options +=
            optionList[i].id + "*green*" + optionList[i]["quantity"];
        } else {
          product_options +=
            "**green**" +
            optionList[i].id +
            "*green*" +
            optionList[i]["quantity"];
        }
      }
    }
    const data_send = {
      // product_options,
      has_option: 0,
      product_id: item.id,
      product_count: 1,
    };
    if (product_options.length > 0) {
      data_send["has_option"] = 1;
      data_send["product_options"] = product_options;
    }
    Axios({
      url: BASE_URL + `cart/add_to_cart`,
      method: "post",
      data: data_send,
    })
      .then((res) => {
        if (res.status == "success") {
          toast.success(res.message);
          getData();
          setOpen(false);
          // getItmData()
        }
      })
      .finally(() => {
        setCartLoading(false);
        setLoading(false);
      });
    // console.log(data_send)
    // handleAddWithOptions(1,product_options);
  };

  useEffect(() => {
    setTotalPrice(
      choosedOption && choosedOption?.length
        ? parseFloat(price) +
            choosedOption?.reduce((a, b) => a + parseFloat(b?.totalPrice), 0)
        : parseFloat(price)
    );
  }, [choosedOption]);
  useEffect(() => {
    if (!open) {
      setChoosedOptions([]);
    }
  }, [open]);
  return (
    <div
      className="category product columnDiv"
      style={{ background: "#F6F4F4" }}
    >
      {discountRatio && (
        <div className="discount_Per">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.951 9.59323C16.4512 9.09301 16.7334 8.41388 16.7334 7.70538V0.890076C16.7334 0.398754 16.3346 0 15.8433 0H9.02804C8.31954 0 7.6404 0.281264 7.13929 0.782376C6.12905 1.79261 3.84242 4.07922 2.03646 5.88518C1.20157 6.72007 0.733398 7.85136 0.733398 9.03249C0.733398 10.2127 1.20157 11.344 2.03646 12.1789C2.84643 12.9889 3.74366 13.8861 4.55452 14.696C5.38852 15.5309 6.52067 16 7.70091 16C8.88115 16 10.0133 15.5309 10.8482 14.696L15.951 9.59323ZM12.3088 3.5603C12.8001 3.5603 13.1989 3.95906 13.1989 4.45038C13.1989 4.9417 12.8001 5.34045 12.3088 5.34045C11.8175 5.34045 11.4188 4.9417 11.4188 4.45038C11.4188 3.95906 11.8175 3.5603 12.3088 3.5603Z"
              fill="#E81E23"
            />
          </svg>{" "}
          وفر {discountRatio}%{" "}
        </div>
      )}

      <div className="productBtn favouriteByn">
        {loading ? (
          <Spinner />
        ) : item.fav == 0 ? (
          <span
            onClick={() => {
              addToFav();
            }}
          >
            {" "}
            <img
              src="https://res.cloudinary.com/duovxefh6/image/upload/v1707728121/Component_7_ihxuhv.png"
              alt=""
            />
          </span>
        ) : (
          <span
            onClick={() => {
              addToFav();
            }}
          >
            <img
              width={20}
              height={20}
              className="remove-favourite"
              src="https://res.cloudinary.com/duovxefh6/image/upload/v1707737155/like_vje2go.png"
              alt=""
            />
          </span>
        )}
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate({
            pathname: "/ProductDetails",
            search: createSearchParams({
              id: id,
            }).toString(),
          })
        }
      >
        <img src={image} alt="" />
      </div>
      <h4>{title}</h4>
      {+discount > 0 ? (
        <div className="discount_container">
          <p className="before_discount">{price} Aed</p>
          <p className="after_discount">
            {discount} <p>Aed</p>
          </p>
        </div>
      ) : (
        <div className="price_container">{price} Aed</div>
      )}
      {
        <div
          className={
            item.in_cart == 0
              ? "productBtn cartBtn"
              : "productBtn cartBtn removeBtn"
          }
          onClick={() => {
            if (cartLoading) {
              return;
            }
            setOptions(item.options);
            if (!isDetailed) {
              return item?.options && item?.options?.length && item.in_cart == 0
                ? setOpen(true)
                : item.in_cart == 0
                ? handleInCart()
                : handleInCart();
            } else
              navigate({
                pathname: "/ProductDetails",
                search: createSearchParams({
                  id: id,
                }).toString(),
              });
          }}
        >
          {cartLoading ? (
            <Spinner />
          ) : item.in_cart == 0 ? (
            addToCart
          ) : (
            removeFromCart
          )}
        </div>
      }
      <PopUp
        open={open}
        title={language == "ar" ? "الإضافات" : "Options"}
        setOpen={setOpen}
        children={
          <>
            {" "}
            <Options
              // product_id={item.id}
              handleChangeQuan={handleChangeQuan}
              options={item?.options}
              language={language}
              setChoosedOptions={setChoosedOptions}
            />
            <div className="modalBtnAddToCart">
              <span className="new-price">
                {language == "ar" ? "السعر الكلي" : "Total Price"} : AED{" "}
                {totalPrice}
              </span>
              {cartLoading ? (
                <Spinner />
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    addToCartWithOptions();
                    // addItemToCart({ item: { ...item, options: choosedOption } });
                    // setOpen(false);
                    // setChoosedOptions([]);
                  }}
                >
                  {language == "ar" ? "إضافة إلى العربة" : "Add To Cart"}
                </button>
              )}
            </div>
          </>
        }
      />
    </div>
  );
};

export default Product;
