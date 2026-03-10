import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products", // This names the slice. Redux uses this internally.

  initialState: { // This is the default data when the app starts.
    items: [] // Later API data will replace this.
  },
  reducers: { // Reducers are functions that change state.
    // They define how data updates happen.
    setProducts: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setProducts } = productSlice.actions; // This exports the action creator. dispatch(setProducts(data))
export default productSlice.reducer; // This exports the reducer function. Remember earlier in store.js:
// import productReducer from "./productSlice";
//Export the reducer function so the Redux store can import it and manage the slice state


// setProducts: (state, action) => {
//     state.items = action.payload;
//   }

// state: This represents the current Redux state of this slice; initially: 
// state = {
//   items: []
// }

// action: Action is the message sent to Redux; Example action: dispatch(setProducts(data))
// action.payload: Payload is the data being sent.

// FLOW:
// dispatch(setProducts(data))
//           ↓
// Redux receives action
//           ↓
// Reducer runs
//           ↓
// state.items = data
//           ↓
// store updated


// Reading Data From Redux: const products = useSelector((state) => state.products.items);
// useSelector Hook used to read Redux data. 
// state: Represents the entire Redux store.
// state.products.items We access the particular stored data.