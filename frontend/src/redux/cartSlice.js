import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.qty += item.qty || 1;
      } else {
        state.cartItems.push({
          ...item,
          qty: item.qty || 1,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;

      const item = state.cartItems.find((i) => i._id === id);

      if (item && qty > 0) {
        item.qty = qty;
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  setCartItems,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
