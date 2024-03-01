import React, { useState } from "react";
import IconWithText from "../../iconWithText";
import "./style.css";
import { EnglishIcon, KSA, Phone, whatsApp } from "../../../assets/svgIcons";
import UseGeneral from "../../../hooks/useGeneral";
import PopUp from "../../popup";
const LeftMiddleHeader = () => {
  const { language, changeLanguage } = UseGeneral();
  const [open, setOpen] = useState(false);
  return (
    <div className="LeftMiddleHeader">
      <IconWithText
        icon={Phone}
        text={"تواصل معنا"}
        onClick={() => setOpen(true)}
      />
      <PopUp open={open} setOpen={setOpen} title={"تواصل معنا"}>
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
      {language?.toLowerCase() == "ar" ? (
        <IconWithText
          icon={EnglishIcon}
          reverse={true}
          pointer={true}
          text={"EN"}
          onClick={() => changeLanguage("en")}
        />
      ) : (
        <IconWithText
          icon={KSA}
          reverse={true}
          pointer={true}
          text={"العربية"}
          onClick={() => changeLanguage("ar")}
        />
      )}
    </div>
  );
};

export default LeftMiddleHeader;
