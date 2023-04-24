import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  cart: fetchFromLocalStorage(),
  totalValue: 0,
  totalItems: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemInCart = state.cart.find(
        (product) => action.payload.id == product.id
      );
      if (isItemInCart) {
        const tempCart = state.cart.map((product) => {
          if (product.id === action.payload.id) {
            let totalQty = product.quantity + action.payload.quantity;
            let total = totalQty * product.price;
            return {
              ...product,
              quantity: totalQty,
              totalPrice: total
            };
          } else return product;
        });
        state.cart = tempCart;
        storeInLocalStorage(state.cart);
      } else {
        state.cart.push(action.payload);
        storeInLocalStorage(state.cart);
      }
    },

    removeFromCart: (state, action) => {
      const tempCart = state.cart.filter(
        (product) => action.payload !== product.id
      );
      state.cart = tempCart;
      storeInLocalStorage(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      storeInLocalStorage(state.cart);
    },

    getCartTotal: (state) => {
      state.totalValue = state.cart.reduce(
        (cartTotal, cartItem) => (cartTotal += cartItem.totalPrice),
        0
      );
      state.totalItems = state.cart.reduce(
        (cartTotal, cartItem) => (cartTotal += cartItem.quantity),
        0
      );
    },

    toggleCartQty: (state, action) => {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;
          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });
      state.cart = tempCart;
      storeInLocalStorage(state.cart);
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  getCartTotal,
  toggleCartQty
} = cartSlice.actions;

export const getCartData = (state) => state.cart.cart;
export const getCartItemsCount = (state) => state.cart.totalItems;
export const getCartTotalAmount = (state) => state.cart.totalValue;
export const cartReducer = cartSlice.reducer;
