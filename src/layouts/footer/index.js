import React, { useState } from "react";
import UseGeneral from "../../hooks/useGeneral";
import "./style.css";
import CopyRight from "../../components/footer/copyRight";
import { footerData } from "../../data/footer";
import { Link } from "react-router-dom";
import IconWithText from "../../components/iconWithText";
import PopUp from "../../components/popup";
import { Phone, whatsApp } from "../../assets/svgIcons";
import Branches from "./components/Branches";
import ReturnPolicy from "./components/ReturnPolicy";
import DeliveryPolicy from "./components/deliveryPolicy";
import TermsConditions from "./components/TermsConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Footer = () => {
  const { language } = UseGeneral();
  const [contactOpen, setContactOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [deliveryPolicyOpen, setDeliveryPoliceOpen] = useState(false);
  const [returnPolicyOpen, setReturnPolicyOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsConditionsOpen, setTermsConditinosOpen] = useState(false);
  const handleOpenPopUp = (name) => {
    if (name === "contact") {
      setContactOpen(true);
    } else if (name === "branches") {
      setBranchesOpen(true);
    } else if (name === "returnPolicy") {
      setReturnPolicyOpen(true);
    } else if (name === "deliveryPolicy") {
      setDeliveryPoliceOpen(true);
    } else if (name === "termsConditions") {
      setTermsConditinosOpen(true);
    } else if (name === "privacyPolicy") {
      setPrivacyPolicyOpen(true);
    }
  };
  return (
    <footer>
      <div className="footer">
        <PopUp
          open={contactOpen}
          setOpen={setContactOpen}
          title={language == "ar" ? "تواصل معنا" : "contact with us"}
        >
          <div className="rowDiv">
            <IconWithText
              icon={Phone}
              text={language == "ar" ? "الخط الساخن" : "hot line"}
              className={"contact"}
            />
          </div>
          <div className="rowDiv">
            <IconWithText
              icon={whatsApp}
              text={language == "ar" ? "واتساب" : "WhatsApp"}
              className={"contact"}
            />
          </div>
        </PopUp>
        <PopUp
          open={branchesOpen}
          setOpen={setBranchesOpen}
          title={language == "ar" ? "الفروع" : "branches"}
        >
          <Branches />
        </PopUp>

        <PopUp
          open={returnPolicyOpen}
          setOpen={setReturnPolicyOpen}
          title={language == "ar" ? "سياسة الاسترجاع" : "return policy"}
        >
          <ReturnPolicy />
        </PopUp>

        <PopUp
          open={deliveryPolicyOpen}
          setOpen={setDeliveryPoliceOpen}
          title={language == "ar" ? "سياسة التوصيل" : "delivery policy"}
        >
          <DeliveryPolicy />
        </PopUp>
        <PopUp
          open={termsConditionsOpen}
          setOpen={setTermsConditinosOpen}
          title={language == "ar" ? "الشروط و الاحكام" : "terms and conditins"}
        >
          <TermsConditions />
        </PopUp>
        <PopUp
          open={privacyPolicyOpen}
          setOpen={setPrivacyPolicyOpen}
          title={language == "ar" ? "سياسة الخصوصيه" : "privacy policy"}
        >
          <PrivacyPolicy />
        </PopUp>
        <div className="topFooter">
          <div className="rowDiv">
            {footerData?.map((item) => {
              return (
                <div className="footerComponent">
                  <h3>{item?.title[language]}</h3>
                  <ul>
                    {item?.items?.map((item) => {
                      return (
                        <li>
                          {item.link !== "#" ? (
                            <Link to={item?.link}>{item?.label[language]}</Link>
                          ) : (
                            <Link onClick={() => handleOpenPopUp(item.name)}>
                              {item?.label[language]}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="footerComponentFooter">
                    {item?.images?.map((item) => {
                      return <img alt="" src={item} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
