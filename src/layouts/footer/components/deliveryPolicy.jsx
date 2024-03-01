import React from "react";
import UseGeneral from "../../../hooks/useGeneral";

const DeliveryPolicy = () => {
  const { language } = UseGeneral();

  const data = [
    {
      description_en:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis consectetur. Animi, quae? Facilis, modi.",
      description_ar: "لا يمكن استرجاع المنتج بعد اسبوع من الشراء",
    },

    {
      description_en:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis consectetur. Animi, quae? Facilis, modi.",
      description_ar: "لا يمكن استرجاع المنتج بعد اسبوع من الشراء",
    },
    {
      description_en:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis consectetur. Animi, quae? Facilis, modi.",
      description_ar: "لا يمكن استرجاع المنتج بعد اسبوع من الشراء",
    },
    {
      description_en:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis consectetur. Animi, quae? Facilis, modi.",
      description_ar: "لا يمكن استرجاع المنتج بعد اسبوع من الشراء",
    },
    {
      description_en:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis consectetur. Animi, quae? Facilis, modi.",
      description_ar: "لا يمكن استرجاع المنتج بعد اسبوع من الشراء",
    },
    {
      description_en:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis consectetur. Animi, quae? Facilis, modi.",
      description_ar: "لا يمكن استرجاع المنتج بعد اسبوع من الشراء",
    },
  ];
  return (
    <div className="deliveryPolicyPopup">
      <ol>
        {data.map((item) => (
          <li className="deliveryPolicy">
            <p>
              {language == "ar" ? item?.description_ar : item?.description_en}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DeliveryPolicy;
