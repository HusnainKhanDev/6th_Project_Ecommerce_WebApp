import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import cartReducer from "./cartSlice"
import orderReduser from "./orderSlice"
import productReducer from "./productSlice"; // This imports the reducer from another file.
//A reducer is simply a function that updates state. Think of reducer as:
// Current state + Action → New state

export const store = configureStore({ // Here we create the global store.
  reducer: {
    products: productReducer, //Registers productReducer as the manager of the products part of the state
    user: userReducer, // these names is used to get data like state.products.items
    cart: cartReducer,
    orders: orderReduser
  }
});