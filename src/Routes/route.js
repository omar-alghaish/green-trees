import Cart from "../pages/Cart";
import ChangeSucces from "../pages/ChangeSuccess/ChangeSucces";
import ConePage from "../pages/ConfPage/ConePage";
import Favourite from "../pages/Favourites";
import Forget from "../pages/ForgetPassword/Forget";
import Login from "../pages/Login/Login";
import NewPassword from "../pages/NewPassword/NewPassword";
import Profile from "../pages/Profile/Profile";
import RegistPage from "../pages/RegistPage/RegistPage";
import Sign from "../pages/Sign/Sign";
import Categories from "../pages/categories";
import Home from "../pages/home";
import ProductDetails from "../pages/productDetails";
import About from "../pages/about/About";
import CancelOrder from "../pages/orderFollowing/CancelOrder";
import OrderFollowing from "../pages/orderFollowing/OrderFollowing";
import Message from "../pages/payDetails/Message";
import PayDetils from "../pages/payDetails/PayDetils";
import Product from "../pages/poducts";
import EditLocation from "../pages/Profile/location/EditLocation";
import Questions from "../layouts/footer/components/Questions";

export const routes = [
  {
    route: "/",
    component: <Home />,
  },
  {
    route: "/registpage",
    component: <RegistPage />,
  },
  {
    route: "/login",
    component: <Login />,
  },
  {
    route: "/sign",
    component: <Sign />,
  },
  {
    route: "/forget",
    component: <Forget />,
  },
  {
    route: "/confnumber",
    component: <ConePage />,
  },
  {
    route: "/newpass",
    component: <NewPassword />,
  },
  {
    route: "/changesuccess",
    component: <ChangeSucces />,
  },
  {
    route: "/profile",
    component: <Profile />,
  },
  {
    route: "/Categories",
    component: <Categories />,
  },
  {
    route: "/Favourite",
    component: <Favourite />,
  },
  {
    route: "/Cart",
    component: <Cart />,
  },
  {
    route: "/ProductDetails",
    component: <ProductDetails />,
  },
  {
    route: "/About",
    component: <About />,
  },
  {
    route: "/pay-details",
    component: <PayDetils />,
  },
  {
    route: "/success",
    component: <Message />,
  },
  {
    route: "/order-following",
    component: <OrderFollowing />,
  },
  {
    route: "/cancel-order",
    component: <CancelOrder />,
  },
  {
    route: "/Product",
    component: <Product />,
  },
  {
    route: "/EditLocation",
    component: <EditLocation />,
  },
  {
    route: "/questions",
    component: <Questions />,
  },
];
