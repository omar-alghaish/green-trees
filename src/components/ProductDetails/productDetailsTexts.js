import React, { useEffect, useState } from "react";
import { returnItem } from "../../assets/svgIcons";
import UseCartFavourite from "../../hooks/useCartFavourite";
import UseGeneral from "../../hooks/useGeneral";
import ProductInCartMangeButton from "../productInCartMangeButton/productInCartMangeButton";
import Options from "../options/options";
import PopUp from "../popup";
import { Axios } from "../../Axios";
import { BASE_URL } from "../../Axios/base_url";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const ProductDetailsTexts = ({ item, choosedOption, setChoosedOptions ,getItmData}) => {
  console.log(item,"wew")
  const { isItemInCart, addItemToCart, update, cart } = UseCartFavourite();
  const { language } = UseGeneral();
  const [addLoading,setAddLoading]=useState(false)
  console.log(addLoading)
  const [showRetPop,setShowRetPop]=useState(false);
  // const [return]
  const [delLoading,setDelLoading]=useState(false)
  const [returnpolicies,setReturnpolicies]=useState([]);
  const [totalPrice, setTotalPrice] = useState(item?.price);
  const [open, setOpen] = useState(false);
// toast.success('reeef')
  const addToCart=()=>{
    setAddLoading(true)
    const data_send={
      product_id:item.id,
      product_count:1,
      has_option:0,
      // product_options:
    }
    console.log(data_send)
    Axios({
      url: BASE_URL + `cart/add_to_cart`,
      method: "post",
      data:data_send
    }).then((res) => {
      if(res.status=='success'){
        toast.success(res.message);
        getItmData()
      }
    console.log(res)
    }).finally(()=>{
    setAddLoading(true)
    });
  }
  const updateData=()=>{

  }

  useEffect(() => {
    setTotalPrice(
      choosedOption && choosedOption?.length
        ? parseFloat(item?.price) +
            choosedOption?.reduce((a, b) => a + parseFloat(b?.totalPrice), 0)
        : parseFloat(item?.price)
    );
  }, [choosedOption]);
  const handleDelFromCart=(id)=>{
    setDelLoading(true)
    const data_send={
      product_id:id,
      product_count:1,
      has_option:0,
    }
    Axios({
      url: BASE_URL + "cart/add_to_cart",
      method: "POST",
      data:data_send
    }).then((res)=>{
      console.log(res)
      if(res.status=='success'){
        toast.success(res.message);
        getItmData()
        updateData()
      }
    }).finally(()=>{
      setDelLoading(false)
      setAddLoading(false)
    })
  }
  return (
    <div className="ProductDetailsTexts">
      <div className="topText">
        <h5>{item.title&&item?.title[language]}</h5>
        <p>{item?.description ? item?.description[language] : "الوصف"}</p>
      </div>
      <span>
        {item?.price}
        <span>{language == "ar" ? "درهم" : "Aed"}</span>
      </span>
      <span className="return">
        {returnItem}
        <span
          onClick={()=>{
            // console.log('eerer');
            setShowRetPop(true)
            setReturnpolicies(item.returnpolicies);
          }}
        >
          <>{language == "ar" ? "سياسة الإرجاع" : "Return Policy"}</>
        </span>
      </span>
      {item.in_cart==0 ? (
        <div className="modalBtnAddToCart">
          {
            addLoading?
            (
              <ThreeDots/>
            )
            :
            (
              <button
            className="btn btn-success"
            onClick={() => {
              addToCart()
              // addItemToCart({ item: { ...item, options: choosedOption } });
              setOpen(false);
              setChoosedOptions([]);
            }}
          >
            <> {language == "ar" ? "إضافة إلى العربة" : "Add To Cart"}</>
          </button>
            )
          }
        </div>
      ) : (
        <ProductInCartMangeButton
        item={item}
        delCartItem={handleDelFromCart}
        updateCart={getItmData}
          itemIdToIncrement={item?.id}
          quantity={
          item.quantity
          }
          update={update}
        />
      )}
        <PopUp open={showRetPop} setOpen={setShowRetPop} title={language=='ar'?'سياسات إرجاع المنتج':'Product Return Policies'}>
          {
            returnpolicies.map((item,index)=>{
              return (
                <div className="retpoli">
                  <p>{index+1} - </p>
                  <h5>{item.text}</h5>
                </div>
              )
            })
          }
        </PopUp>
    </div>
  );
};

export default ProductDetailsTexts;