import React, { useEffect, useState } from "react";
import QnADropdown from "./QaA";
import UseGeneral from "../../../hooks/useGeneral";
import "./question.css";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

const Questions = () => {
  const { language } = UseGeneral();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const getQuestions = () => {
    setLoading(true);
    Axios({
      url: BASE_URL + `faqs/get_all_for_user`,
      method: "GET",
    })
      .then((res) => {
        if (res?.status == "success") {
          setQuestions(res.result);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="questions_page">
      <h2>{language == "ar" ? "الاسئله الشائعه" : "common questions"}</h2>
      {loading ? (
        <ThreeCircles />
      ) : (
        <div className="questions">
          {questions.map((item) => (
            <div>
              <QnADropdown
                question={language == "ar" ? item?.title_ar : item?.title_en}
                answer={
                  language == "ar" ? item?.description_ar : item?.description_en
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
