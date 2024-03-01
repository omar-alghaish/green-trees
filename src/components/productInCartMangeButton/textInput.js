import React from 'react';

const TextInput = ({ text }) => {
  console.log(text + "text");
  return <p className="TextInput">{text}</p>;
};

export default TextInput;
