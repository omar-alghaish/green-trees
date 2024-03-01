import React from "react";
import UseGeneral from "../../hooks/useGeneral";
const PayProducts = ({ style, dividerStyle ,orderData}) => {
  const { language } = UseGeneral();

  console.log(orderData)
  return (
    <div className="pay-products-card-container" style={style}>
      <div className="top">
        <h4>{language=='ar'?'المنتجات':'Products'}</h4>
        {
          language=='ar'?
          <p>لديك {orderData?.orderproducts?.length} منتجات</p>
          :
          <p>You Have {orderData?.orderproducts?.length} Product</p>
        }
      </div>
      <div className="products">
        {orderData?.orderproducts&&orderData?.orderproducts.map((item) => (
          <>
            <div className="row">
              <div className="right">
                <div className="img-container">
                  <img
                    src={
                      item.product.images[0].url.includes('.')?item.product.images[0].url:require('../../assets/images/no_image.png')
                    }
                    //"https://res.cloudinary.com/duovxefh6/image/upload/v1707727474/%D8%AC%D8%A8%D9%86%D8%A9-%D9%82%D8%AF%D9%8A%D9%85%D8%A9_1_oms201.png"
                  />
                </div>
                <div className="details">
                  <strong>{language=='ar'?item.product.title_ar:item.product.title_en}</strong>
                  {/* <p>الكميه 20 كج</p> */}
                </div>
              </div>

              <div className="price">
                <p>{item.product.price}Aed</p>
              </div>
            </div>
            <div className="divider"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PayProducts;
