import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../store/cartReducer";
import { addToFavorites, removeFromFavorites } from "../store/favoriteReducer";

const UseCartFavourite = () => {
  const cart = useSelector((state) => state?.cart?.items);
  const allCart = useSelector((state) => state?.cart);
  const totalPrice = useSelector((state) => state?.cart?.totalPrice);
  const totalQuantity = useSelector((state) => state?.cart?.totalQuantity);
  const favourite = useSelector((state) => state?.favourite?.favoriteItems);
  const dispatch = useDispatch();
  const addToCart = ({ item }) => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };
  const update = ({ itemIdToIncrement, proccess }) => {
    if (proccess == "+") {
      dispatch(incrementQuantity({ itemIdToIncrement }));
    } else {
      dispatch(decrementQuantity({ itemIdToIncrement }));
    }
  };

  const removeFromCart = ({ itemIdToRemove }) => {
    dispatch(removeItem({ itemIdToRemove }));
  };

  const isItemInCart = (id) => {
    return cart?.some((item) => item?.id == id);
  };

  const addToFavourite = ({ item }) => {
    dispatch(addToFavorites(item));
  };

  const removeFromFavourite = ({ itemIdToRemove }) => {
    dispatch(removeFromFavorites({ itemIdToRemove }));
  };

  const isItemInFavourite = (id) => {
    return favourite?.some((item) => item?.id == id);
  };

  return {
    cart,
    favourite,
    addItemToCart: addToCart,
    update,
    removeItemFromCart: removeFromCart,
    isItemInCart,
    isItemInFavourite,
    addToFavourite,
    removeFromFavourite,
    totalPrice,
    totalQuantity,
    allCart,
  };
};

export default UseCartFavourite;
