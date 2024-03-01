import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import 'rsuite/Loader/styles/index.css';

import "./App.css";
import { AppRoutes } from "./Routes/routes";
import DefaultLayout from "./layouts/defaultLayout";

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
