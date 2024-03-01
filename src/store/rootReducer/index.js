import { combineReducers } from "redux";
import languageReducer from "../languageReducer";
import favoriteReducer from "../favoriteReducer";
import cartReducer from "../cartReducer";
import refresh from "../refresh";

export default combineReducers({
  language: languageReducer,
  favourite: favoriteReducer,
  cart: cartReducer,
  refresh:refresh
});
