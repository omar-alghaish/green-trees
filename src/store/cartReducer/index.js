import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const calculateTotalPriceAndQuantity = (items) => {
  let totalPrice = 0;
  let totalQuantity = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;

    // Add the price and quantity of each option
    if (item.options) {
      item.options.forEach((option) => {
        totalPrice += parseFloat(option.price) * option.quantity;
      });
    }

    totalQuantity += item.quantity;
  });

  return { totalPrice, totalQuantity };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
        toast.success("Item added successfully");
      }

      const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    removeItem(state, action) {
      const itemIdToRemove = action.payload?.itemIdToRemove;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
      toast.success("Item removed successfully");

      const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    incrementQuantity(state, action) {
      const itemIdToIncrement = action.payload?.itemIdToIncrement;
      const itemToIncrement = state.items.find(
        (item) => item.id === itemIdToIncrement
      );

      if (itemToIncrement) {
        state.items = state.items.map((item) => {
          if (item.id === itemIdToIncrement) {
            // Increment quantity of the main product
            item.quantity += 1;

            // Increment quantity and update total price of options
            if (item.options) {
              item.options.forEach((option) => {
                option.quantity += 1;
                option.totalPrice = parseFloat(option.price) * option.quantity;
              });
            }
          }
          return item;
        });
      }

      const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
      return state;
    },

    decrementQuantity(state, action) {
      const itemIdToDecrement = action.payload?.itemIdToIncrement;
      const itemToDecrement = state.items.find(
        (item) => item.id === itemIdToDecrement
      );

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        state.items = state.items.map((item) => {
          if (item.id === itemIdToDecrement) {
            // Decrement quantity of the main product
            item.quantity -= 1;

            // Decrement quantity and update total price of options
            if (item.options) {
              item.options.forEach((option) => {
                option.quantity -= 1;
                option.totalPrice = parseFloat(option.price) * option.quantity;
              });
            }
          }
          return item;
        });
      }

      const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity(
        state.items
      );
      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
      return state;
    },
  },
});

export const {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
