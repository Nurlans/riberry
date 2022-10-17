import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
	selectedType: string[]
	selectedStyle: string[]
}

const initialState: FilterState = {
	selectedType: [],
	selectedStyle: []
}
export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		addType: (state, action: PayloadAction<string>) => {
			state.selectedType = [...state.selectedType, action.payload]
		},
		addStyle: (state, action: PayloadAction<string>) => {
			state.selectedStyle = [...state.selectedStyle, action.payload]
		},
		deleteType: (state, action: PayloadAction<string>) => {
			state.selectedType = state.selectedType.filter(
				(item: string) => item !== action.payload
			)
		},
		deleteStyle: (state, action: PayloadAction<string>) => {
			state.selectedStyle = state.selectedStyle.filter(
				(item: string) => item !== action.payload
			)
		},
		clearAllStyles: (state, action: PayloadAction<[]>) => {
			state.selectedStyle = []
		},
		clearAllTypes: (state, action: PayloadAction<[]>) => {
			state.selectedType = []
		}
	}
})
export default filterSlice.reducer
