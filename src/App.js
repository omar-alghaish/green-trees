import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/defaultLayout";
import Home from "./pages/home";
import { AppRoutes } from "./Routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData, refresh } from "./store/refresh";

function App() {
  // const s=useSelector(s=>console.log(s));
  const dispatch = useDispatch();

//   const fetchDataHandler = () => {
//     dispatch(fetchData());
//   };
// setTimeout(() => {
//   fetchDataHandler()
// }, 5*60*60);
  return (
    <DefaultLayout>
      <AppRoutes />
      <Toaster containerClassName="toastCon"/>
    </DefaultLayout>
  );
}

export default App;
