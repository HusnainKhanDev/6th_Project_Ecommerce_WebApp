import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        Orderitems: []
    },
    reducers: {
        setOrder: (state, action) => {
            state.Orderitems = action.payload 
        }
    }

})


export const { setOrder } = orderSlice.actions
export default orderSlice.reducer