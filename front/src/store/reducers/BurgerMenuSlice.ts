import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlogsState {
	burgerMenu: boolean
	showFilter: boolean
	showSelectedFilter: boolean
}

const initialState: BlogsState = {
	burgerMenu: false,
	showFilter: false,
	showSelectedFilter: false
}
export const blogsSlice = createSlice({
	name: 'burger',
	initialState,
	reducers: {
		openBurger: (state: BlogsState, action: PayloadAction<boolean>) => {
			state.burgerMenu = action.payload
		},
		openFilter: (state: BlogsState, action: PayloadAction<boolean>) => {
			state.showFilter = action.payload
		},
		openSelectedFilter: (state: BlogsState, action: PayloadAction<boolean>) => {
			state.showSelectedFilter = action.payload
		}
	}
})
export default blogsSlice.reducer
