import React from "react";
import Header from "../header";
import Footer from "../footer";

const DefaultLayout = ({ classessName, children }) => {
  return (
    <div
      className={
        !classessName || !classessName?.length
          ? "defaultLayout"
          : "defaultLayout" + " " + classessName?.join()
      }
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
