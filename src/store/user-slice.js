import { createSlice } from "@reduxjs/toolkit";

const getStoredItem = (key, fallback) => {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const emptyState = () => ({
  value: 0,
  user: {},
  profile: {},
  wishlist: getStoredItem("porsche_wishlist", []),
  cart: getStoredItem("porsche_cart", []),
  orders: getStoredItem("porsche_orders", []),
  address: [],
  authPending: false,
  authError: null,
});

const storedToken =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  ...emptyState(),
  user: storedToken ? { token: storedToken } : {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStarted(state) {
      state.authPending = true;
      state.authError = null;
    },
    authFailed(state, action) {
      state.authPending = false;
      state.authError = action.payload;
    },
    authErrorCleared(state) {
      state.authError = null;
    },
    userLogin(state, action) {
      state.user = action.payload;
      state.authPending = false;
      state.authError = null;
    },
    userSignup(state, action) {
      state.user = action.payload;
      state.authPending = false;
      state.authError = null;
    },
    userLogout() {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("token");
      }
      return emptyState();
    },
    userProfile(state, action) {
      state.profile = action.payload || {};
      if (Array.isArray(action.payload?.address)) {
        state.address = action.payload.address;
      }
      // If backend has cart/wishlist/orders, merge or update
      if (Array.isArray(action.payload?.cart) && action.payload.cart.length > 0) {
        state.cart = action.payload.cart;
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("porsche_cart", JSON.stringify(state.cart));
        }
      }
      if (Array.isArray(action.payload?.wishlist) && action.payload.wishlist.length > 0) {
        state.wishlist = action.payload.wishlist;
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("porsche_wishlist", JSON.stringify(state.wishlist));
        }
      }
      if (Array.isArray(action.payload?.orders) && action.payload.orders.length > 0) {
        state.orders = action.payload.orders;
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("porsche_orders", JSON.stringify(state.orders));
        }
      }
    },
    addNewAddress(state, action) {
      state.address = [...(state.address || []), action.payload];
    },
    addToWishlist(state, action) {
      if (Array.isArray(action.payload)) {
        state.wishlist = action.payload;
      } else if (action.payload && (action.payload._id || action.payload.id)) {
        const item = action.payload;
        const id = (item._id || item.id).toString();
        if (!state.wishlist.some((w) => (w._id || w.id).toString() === id)) {
          state.wishlist.push(item);
        }
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("porsche_wishlist", JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist(state, action) {
      if (Array.isArray(action.payload)) {
        state.wishlist = action.payload;
      } else {
        const targetId = (action.payload?._id || action.payload?.id || action.payload || "").toString();
        state.wishlist = state.wishlist.filter(
          (w) => (w._id || w.id).toString() !== targetId
        );
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("porsche_wishlist", JSON.stringify(state.wishlist));
      }
    },
    addToCart(state, action) {
      if (Array.isArray(action.payload)) {
        state.cart = action.payload;
      } else if (action.payload) {
        const { product, _id, qty = 1 } = action.payload;
        const productId = (product?._id || _id || action.payload.id || "").toString();
        const existingIdx = state.cart.findIndex(
          (item) => item.product && (item.product._id || item.product.id || "").toString() === productId
        );

        if (existingIdx >= 0) {
          if (qty <= 0) {
            state.cart.splice(existingIdx, 1);
          } else {
            state.cart[existingIdx].unit = qty;
            if (product && !state.cart[existingIdx].product?.name) {
              state.cart[existingIdx].product = product;
            }
          }
        } else if (qty > 0) {
          state.cart.push({
            product: product || { _id: productId },
            unit: qty,
          });
        }
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("porsche_cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart(state, action) {
      if (Array.isArray(action.payload)) {
        state.cart = action.payload;
      } else {
        const targetId = (action.payload?._id || action.payload?.id || action.payload || "").toString();
        state.cart = state.cart.filter(
          (item) => item.product && (item.product._id || item.product.id || "").toString() !== targetId
        );
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("porsche_cart", JSON.stringify(state.cart));
      }
    },
    placeOrder(state, action) {
      const newOrder = action.payload || {
        _id: "ORD-" + Date.now(),
        orderId: "PORSCHE-" + Date.now().toString().slice(-6),
        amount: 0,
        status: "Confirmado",
        createdAt: new Date().toISOString(),
      };
      state.orders = [newOrder, ...(state.orders || [])];
      state.cart = [];
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("porsche_orders", JSON.stringify(state.orders));
        localStorage.removeItem("porsche_cart");
      }
    },
  },
});

export const {
  authStarted,
  authFailed,
  authErrorCleared,
  userLogin,
  userSignup,
  userLogout,
  userProfile,
  addNewAddress,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  placeOrder,
} = userSlice.actions;

export default userSlice.reducer;
