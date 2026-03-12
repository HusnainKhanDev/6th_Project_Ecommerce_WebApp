import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        Cartitems: []
    },
    reducers: {
        setcart: (state, action) => {
            let search = true
            if (Array.isArray(action.payload)) { // work when we fetch item from api
                state.Cartitems = action.payload  // ✅ just replace entire cart
                return
            }

            state.Cartitems.forEach((i) => {
                if (i.id == action.payload.id) {
                    search = false
                }
            })

            if (search) {
                state.Cartitems.push(action.payload)
            }

        }
    }

})


export const { setcart } = cartSlice.actions
export default cartSlice.reducer