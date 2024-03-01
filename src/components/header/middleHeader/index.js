import React, { useEffect, useState } from "react";
import IconWithText from "../../iconWithText";
import { location } from "../../../assets/svgIcons";
import LeftMiddleHeader from "./leftHeader";
import { Axios } from "../../../Axios";
import { BASE_URL } from "../../../Axios/base_url";

const MiddleHeader = () => {
  const [mainLocation, setMainLocation] = useState({});
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUserLocations = () => {
    setLoading(true);
    Axios({
      url: BASE_URL + `userlocation/get_user_locations`,
      method: "GET",
    })
      .then((res) => {
        if (res?.status == "success") {
          setLocations(res?.result);
          const theMain = res.result.find((item) => item?.status == "1");
          setMainLocation(theMain);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(mainLocation);
  useEffect(() => {
    getAllUserLocations();
  }, []);

  return (
    <div className="rowDiv">
      {mainLocation?.special_marque ? (
        <IconWithText
          icon={location}
          text={`${mainLocation?.special_marque}`}
        />
      ) : (
        " "
      )}
      <LeftMiddleHeader />
    </div>
  );
};

export default MiddleHeader;
