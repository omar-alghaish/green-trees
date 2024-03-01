import { Route, Routes } from "react-router";
import { routes } from "./route";
import Home from "../pages/home";

export const AppRoutes = () => {
  return (
    // <DefaultLayout
    //   children={
    //     <>

    //     </>
    //   }
    // />
    <Routes>
      {routes.map((item, index) => {
        return <Route path={item.route} element={item.component} key={index} />;
      })}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
