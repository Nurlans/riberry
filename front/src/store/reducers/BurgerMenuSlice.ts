import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface BlogsState {
    burgerMenu: boolean
    showFilter: boolean
}

const initialState: BlogsState = {
    burgerMenu: false,
    showFilter: false
}
export const blogsSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        openBurger: (state, action: PayloadAction<boolean>) => {
            state.burgerMenu = action.payload
        },
        openFilter: (state, action: PayloadAction<boolean>) => {
            state.showFilter = action.payload
        },
    },

})
export default blogsSlice.reducer