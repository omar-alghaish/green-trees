import { useDispatch, useSelector } from "react-redux";
import { change } from "../store/languageReducer";
import { useEffect } from "react";

const UseGeneral = () => {
  const language = useSelector((state) => state?.language?.language);
  const dispatch = useDispatch();
  const changeLanguage = (payload) => {
    dispatch(change(payload));
  };
  useEffect(() => {
    if (language.toLowerCase() == "ar") {
      document.body.classList.add("arVersion");
      document.body.classList.remove("enVersion");
    } else {
      document.body.classList.add("enVersion");
      document.body.classList.remove("arVersion");
    }
  }, [language]);
  return {
    language: language?.toLowerCase(),
    changeLanguage: changeLanguage,
  };
};

export default UseGeneral;
