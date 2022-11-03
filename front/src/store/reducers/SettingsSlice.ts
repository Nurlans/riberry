import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../../utils/enum'

interface SettingsState {
	lang: Language
	loading: boolean
}

const initialState: SettingsState = {
	lang: Language.en,
	loading: false
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		changeLang: (state, action: PayloadAction<Language>) => {
			state.lang = action.payload
		}
	}
})
export default settingsSlice.reducer
