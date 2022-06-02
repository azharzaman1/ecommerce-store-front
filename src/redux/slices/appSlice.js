import { createSlice } from "@reduxjs/toolkit";
import { replaceItemAtIndex } from "../../utils";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    products: [],
    categories: [],
    currency: "USD",
    cart: [],
    miniCartOpen: false,
    product: {},
  },
  reducers: {
    SET_PRODUCTS: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    SET_CATEGORIES: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    SET_CURRENCY: (state, action) => {
      return {
        ...state,
        currency: action.payload,
      };
    },
    SET_CART: (state, action) => {
      return {
        ...state,
        cart: action.payload.sort(
          (a, b) => a.prices[0].amount - b.prices[0].amount
        ),
      };
    },
    PUSH_TO_CART: (state, action) => {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    UPDATE_PRODUCT_IN_CART: (state, action) => {
      const newProduct = action.payload;
      const indexInArray = state.cart.findIndex(
        (product) => product.id === newProduct.id
      );
      const productToReplace = { ...state.cart[indexInArray] };

      if (indexInArray > -1) {
        return {
          ...state,
          cart: replaceItemAtIndex(
            state.cart,
            {
              ...newProduct,
              qty: productToReplace.qty,
              addedAt: productToReplace.addedAt,
            },
            indexInArray
          ),
        };
      }
    },
    EMPTY_CART: (state, action) => {
      return {
        ...state,
        cart: [],
      };
    },
    SET_MINICART_OPEN: (state, action) => {
      return {
        ...state,
        miniCartOpen: action.payload,
      };
    },

    PRODUCT_QUANTITY_INCREMENT: (state, action) => {
      const productID = action.payload.productID;
      const quantity = action.payload.qunatity || 1;
      const cartSafeCopy = [...state.cart];

      const presentAtIndex = cartSafeCopy.findIndex(
        (product) => product.uid === productID
      );

      if (presentAtIndex < 0) return state;

      let targetProduct = cartSafeCopy[presentAtIndex];

      const filteredCart = cartSafeCopy.filter(
        (product) => product.uid !== productID
      );

      filteredCart.splice(presentAtIndex, 0, {
        ...targetProduct,
        qty: targetProduct.qty + quantity,
      });

      return {
        ...state,
        cart: filteredCart,
      };
    },

    PRODUCT_QUANTITY_DECREMENT: (state, action) => {
      const productID = action.payload.productID;
      const quantityToDecrease = action.payload.qunatityToDecrease || 1;
      const cartSafeCopy = [...state.cart];

      const presentAtIndex = cartSafeCopy.findIndex(
        (product) => product.uid === productID
      );

      let targetProduct = cartSafeCopy[presentAtIndex];

      if (presentAtIndex < 0) return state; // product not present in cart(bug call)

      if (targetProduct.qty === 1) {
        // product quantity is 1 - delete this product
        const cartAfterProductDelete = cartSafeCopy.filter(
          (product) => product.uid !== targetProduct.uid
        );
        // return filtered cart
        return { ...state, cart: cartAfterProductDelete };
      }

      const filteredCart = cartSafeCopy.filter(
        (product) => product.uid !== productID
      );

      filteredCart.splice(presentAtIndex, 0, {
        ...targetProduct,
        qty: targetProduct.qty - quantityToDecrease,
      });

      return {
        ...state,
        cart: filteredCart,
      };
    },

    SET_PRODUCT: (state, action) => {
      return { ...state, product: action.payload };
    },
  },
});

export const {
  SET_PRODUCTS,
  SET_CATEGORIES,
  SET_CURRENCY,
  SET_CART,
  PUSH_TO_CART,
  UPDATE_PRODUCT_IN_CART,
  EMPTY_CART,
  SET_MINICART_OPEN,
  PRODUCT_QUANTITY_INCREMENT,
  PRODUCT_QUANTITY_DECREMENT,
  SET_PRODUCT,
} = appSlice.actions;

export default appSlice.reducer;

/*
const basketTotal = (basket, extra) => {
  return basket?.reduce((amount, item) => item.price * item.qty + amount, 0);
};
*/
