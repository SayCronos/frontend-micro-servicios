import { DeleteData, GetData, PostData, PutData } from "../../utils";
import { landingProducts, productDetails } from "../shpping-slice";
import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  addNewAddress,
  placeOrder,
} from "../user-slice";

export const onGetProducts = (payload) => async (dispatch) => {
  try {
    const response = await GetData("/");
    if (response && response.data) {
      dispatch(landingProducts(response.data));
    }
  } catch (err) {
    console.warn("Error fetching products:", err);
  }
};

export const onGetProductDetails = (id) => async (dispatch) => {
  try {
    const response = await GetData("/" + id);
    if (response && response.data) {
      dispatch(productDetails(response.data));
    }
  } catch (err) {
    console.warn("Error fetching product details:", err);
  }
};

/* ------------------- Wishlist --------------------- */

export const onAddToWishlist = (productOrId) => async (dispatch, getState) => {
  const isObject = typeof productOrId === "object" && productOrId !== null;
  const _id = isObject ? (productOrId._id || productOrId.id) : productOrId;
  const product = isObject
    ? productOrId
    : getState().shoppingReducer.products.find((p) => p._id === _id) || { _id };

  // 1. Inmediato en Redux & localStorage
  dispatch(addToWishlist(product));

  // 2. Sincronización remota si hay sesión
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    try {
      const response = await PutData("/customer/wishlist", { _id, product });
      if (response && response.data) {
        dispatch(addToWishlist(response.data));
      }
    } catch (err) {
      console.warn("Remote wishlist sync fallback to local:", err);
    }
  }
};

export const onRemoveFromWishlist = (_id) => async (dispatch) => {
  // 1. Inmediato en Redux & localStorage
  dispatch(removeFromWishlist(_id));

  // 2. Sincronización remota
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    try {
      const response = await DeleteData("/customer/wishlist/" + _id);
      if (response && response.data) {
        dispatch(removeFromWishlist(response.data));
      }
    } catch (err) {
      console.warn("Remote wishlist remove fallback to local:", err);
    }
  }
};

/* ------------------- Cart --------------------- */

export const onAddToCart =
  ({ product, _id, qty = 1 }) =>
  async (dispatch, getState) => {
    const targetId = _id || (product && (product._id || product.id));
    const fullProduct =
      product ||
      getState().shoppingReducer.products.find((p) => p._id === targetId) ||
      getState().shoppingReducer.currentProduct ||
      { _id: targetId };

    // 1. Inmediato en Redux & localStorage (0 ms de espera)
    dispatch(addToCart({ product: fullProduct, _id: targetId, qty }));

    // 2. Sincronización remota si hay sesión activa
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const response = await PutData("/customer/cart", {
          _id: targetId,
          product: fullProduct,
          qty,
        });
        if (response && response.data) {
          dispatch(addToCart(response.data));
        }
      } catch (err) {
        console.warn("Remote cart sync fallback to local:", err);
      }
    }
  };

export const onRemoveFromCart = (_id) => async (dispatch) => {
  // 1. Inmediato en Redux & localStorage
  dispatch(removeFromCart(_id));

  // 2. Sincronización remota
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    try {
      const response = await DeleteData("/customer/cart/" + _id);
      if (response && response.data) {
        dispatch(removeFromCart(response.data));
      }
    } catch (err) {
      console.warn("Remote cart remove fallback to local:", err);
    }
  }
};

export const onCreateAddress =
  ({ street, postalCode, city, country }) =>
  async (dispatch) => {
    try {
      const response = await PostData("/customer/address", {
        street,
        postalCode,
        city,
        country,
      });
      if (response && response.data) {
        dispatch(addNewAddress(response.data));
      }
    } catch (err) {
      console.warn("Error creating address:", err);
    }
  };

export const onPlaceOrder =
  ({ txnId, amount, items, paymentMethod = "CreditCard" }) =>
  async (dispatch, getState) => {
    const currentCart = getState().userReducer.cart || [];
    const calculatedAmount =
      amount ||
      currentCart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.unit || 1), 0);

    const orderPayload = {
      _id: "ORD-PORSCHE-" + Date.now(),
      orderId: "PORSCHE-" + Date.now().toString().slice(-6),
      amount: calculatedAmount,
      txnId: txnId || "TXN-PORSCHE-" + Math.floor(100000 + Math.random() * 900000),
      status: "Confirmado",
      paymentMethod,
      items: items || currentCart,
      createdAt: new Date().toISOString(),
    };

    // 1. Registrar pedido inmediatamente en Redux y vaciar carrito
    dispatch(placeOrder(orderPayload));

    // 2. Sincronizar con backend si hay token
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        await PostData("/customer/order", orderPayload).catch(() => {});
        await PostData("/shopping/order/", { txnId: orderPayload.txnId }).catch(() => {});
      } catch (err) {
        console.warn("Remote order sync fallback to local:", err);
      }
    }

    return orderPayload;
  };
