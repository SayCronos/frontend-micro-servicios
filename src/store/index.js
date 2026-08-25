import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./user-slice";
import shoppingReducer from "./shpping-slice";
import { registerUnauthorizedHandler } from "../utils";
import { onLogout } from "./actions/user-actions";

export const store = configureStore({
  reducer: {
    userReducer,
    shoppingReducer,
  },
  devTools: !import.meta.env.PROD,
});

setupListeners(store.dispatch);

// An expired token would otherwise leave the UI on an empty account screen with
// no explanation; sign the customer out instead.
registerUnauthorizedHandler(() => store.dispatch(onLogout()));

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
