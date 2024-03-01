import React from "react";
import UseGeneral from "../../../hooks/useGeneral";
import "./style.css";
const Ideas = () => {
  const { language } = UseGeneral();
  return (
    <div className="rowDiv ideas">
      <div
        className="banner"
        style={{
          background: `#FEFE00 no-repeat`,
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/duovxefh6/image/upload/v1707740110/Group_194_y8jcom.png"
          }
          alt=""
        />
        <h4>
          {language === "ar"
            ? "وقتك مش هيضيع !"
            : "Your time will not be wasted!"}
        </h4>
        <p>
          {language === "ar"
            ? "بنقدملك أفكار  سهلة و بسيطة, تنجزك في يومك"
            : "We offer you easy and simple ideas that will help you in your day"}
        </p>
        <button className="btn btn-danger">
          {language === "ar" ? "أكتشف المزيد" : "Explore More"}
        </button>
      </div>
    </div>
  );
};

export default Ideas;
