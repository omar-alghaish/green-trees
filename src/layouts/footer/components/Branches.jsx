import React from "react";
import "./style.css";
const Branches = () => {
  const data = [
    {
      location: "8 ش علي رمضان",
      city: "tanta",
    },
    {
      location: "8 ش علي رمضان",
      city: "tanta",
    },
    {
      location: "8 ش علي رمضان",
      city: "tanta",
    },
  ];
  return (
    <div className="branchesPopUp">
      <ol>
        {data.map((item) => (
          <li className="branch">
            <h5>{item?.city}</h5>
            <p>{item?.location}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Branches;
