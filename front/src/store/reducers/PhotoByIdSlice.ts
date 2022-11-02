import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPhoto } from '../../models/IPhoto'
import { fetchPhotoById, fetchPhotos } from './ActionCreators'

interface PhotoState {
	photosById: IPhoto
	isLoading: boolean
	error: string
}

const initialState: PhotoState = {
	photosById: {
		id: 0,
		attributes: {
			id: 0,
			title: '',
			place_type: '',
			place_style: '',
			blockForm: '',
			area: 0,
			description: '',
			country: '',
			city: '',
			images: {
				data: [
					{
						id: 0,
						attributes: {
							name: '',
							width: 0,
							height: 0,
							url: ''
						}
					}
				]
			},
			desc: {
				az: '',
				ru: '',
				en: '',
				id: 0
			},
			path: ''
		}
	},
	isLoading: false,
	error: ''
}
export const photoByIdSlice = createSlice({
	name: 'photosById',
	initialState,
	reducers: {},

	extraReducers: {
		[fetchPhotoById.fulfilled.type]: (state, action: PayloadAction<IPhoto>) => {
			state.isLoading = false
			state.error = ''
			state.photosById = action.payload
		},
		[fetchPhotoById.pending.type]: state => {
			state.isLoading = true
		},
		[fetchPhotoById.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		}
	}
})
export default photoByIdSlice.reducer
