import React, { useState, useEffect } from "react";
import BottomHeader from "../../components/header/bottomHeader";
import MiddleHeader from "../../components/header/middleHeader";
import TopHeader from "../../components/header/topHeader";
import { homeCategories } from "../../data/homeCategories";
import "./style.css";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <TopHeader />
      <MiddleHeader />
      <BottomHeader homeCategories={homeCategories} />
    </header>
  );
};

export default Header;
