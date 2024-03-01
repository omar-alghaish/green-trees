import React, { useState } from "react";
import Collapse from "react-collapse";
import "./question.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const QnADropdown = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="question_container">
      <div style={{}}>
        <div onClick={() => setIsOpen(!isOpen)} className="question">
          <strong>{question}</strong>{" "}
        </div>

        <Collapse isOpened={isOpen}>
          <div className="answer">{answer}</div>
        </Collapse>
      </div>{" "}
      <div className="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>
  );
};

export default QnADropdown;
