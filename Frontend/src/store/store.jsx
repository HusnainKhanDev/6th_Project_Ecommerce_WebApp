import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import productReducer from "./productSlice"; // This imports the reducer from another file.
//A reducer is simply a function that updates state. Think of reducer as:
// Current state + Action → New state

export const store = configureStore({ // Here we create the global store.
  reducer: {
    products: productReducer, //Registers productReducer as the manager of the products part of the state
    user: userReducer
  }
});