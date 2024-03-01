import React, { useState } from 'react';
import "./style.css";
import UseGeneral from '../../hooks/useGeneral';
const Tabs = ({ setTabId }) => {
  const tabs = [
    {
      id: "0",
      title: {
        ar: "الأكثر مبيعا",
        en: "Most Sell",
      },
    },
    {
      id: "1",
      title: {
        ar: "وصل حديثا",
        en: "recently added",
      },
    },
    {
      id: "2",
      title: {
        ar: "الرائج",
        en: "Trending",
      },
    },
  ];
  const [tab, setTab] = useState(0);
  const { language } = UseGeneral();
  return (
    <div className="rowDiv tabs">
      {tabs?.map((item) => {
        return (
          <span
            className={item?.id == tab ? 'tab-btn activeTab' : 'tab-btn'}
            onClick={() => {
              setTab(item?.id);
              setTabId(item?.id);
            }}
          >
            {item?.title[language]}
          </span>
        );
      })}
    </div>
  );
};

export default Tabs;
