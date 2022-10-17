import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPhoto, IPhotoTotalInfo } from '../../models/IPhoto'

interface PhotoState {
	rightPhotos: IPhoto[]
	photos: IPhoto[]
	isLoading: boolean
	error: string
	selectedNavPage: string
	pageCount: number
}

const initialState: PhotoState = {
	rightPhotos: [],
	photos: [],
	isLoading: false,
	error: '',
	selectedNavPage: '',
	pageCount: 0
}

export const photoSlice = createSlice({
	name: 'photos',
	initialState,
	reducers: {
		photosByFilterFetching(state) {
			state.isLoading = true
		},
		photosByFilterFetchingSuccess(
			state,
			action: PayloadAction<IPhotoTotalInfo>
		) {
			if (action.payload.data.length) {
				let size = Math.ceil(action.payload.data.length / 2)
				let subarray = []
				for (let i = 0; i < Math.ceil(action.payload.data.length / size); i++) {
					subarray[i] = action.payload.data.slice(i * size, i * size + size)
				}
				state.isLoading = false
				state.error = ''
				state.rightPhotos = subarray[1]
				state.photos = subarray[0]
				// state.photos = action.payload.data
				state.pageCount = action.payload.meta.pagination.pageCount
			} else {
				state.isLoading = false
				state.error = ''
				state.rightPhotos = []
				state.photos = []
				// state.photos = action.payload.data
				state.pageCount = action.payload.meta.pagination.pageCount
			}
		},
		photosByFilterFetchingError(state, action: PayloadAction<IPhoto[]>) {
			state.isLoading = false
		},
		photosByPaginationFetching(state) {
			state.isLoading = true
		},
		photosByPaginationFetchingSuccess(
			state,
			action: PayloadAction<IPhotoTotalInfo>
		) {
			if (action.payload.data.length) {
				let size = Math.ceil(action.payload.data.length / 2)
				let subarray = []
				for (let i = 0; i < Math.ceil(action.payload.data.length / size); i++) {
					subarray[i] = action.payload.data.slice(i * size, i * size + size)
				}

				state.error = ''
				state.rightPhotos = state.rightPhotos.concat(subarray[1])
				state.photos = state.photos.concat(subarray[0])
				state.pageCount = action.payload.meta.pagination.pageCount
				state.isLoading = false
			} else {
				state.isLoading = false
				state.error = ''
				state.rightPhotos = []
				state.photos = []
				// state.photos = action.payload.data
				state.pageCount = action.payload.meta.pagination.pageCount
			}
		},
		photosByPaginationFetchingError(state, action: PayloadAction<IPhoto[]>) {
			state.isLoading = false
		},
		selectNavPage: (state, action: PayloadAction<string>) => {
			state.selectedNavPage = action.payload
			// state.isLoading = false
		},
		clearState: (state, action: PayloadAction<string>) => {
			state.isLoading = true
			state.photos = []
			state.rightPhotos = []
			state.isLoading = false
		}
	}
	// extraReducers: (builder) => {
	//     builder.addCase(selectNavPage, (state, action:PayloadAction<any>) => {
	//         debugger
	//         return state.selectedNavPage = action.payload
	//     })
	// },
	// extraReducers: {
	//     [fetchPhotos.fulfilled.type]: (state, action: PayloadAction<IPhoto[]>) => {
	//         state.isLoading = false
	//         state.error = ''
	//         state.photos = action.payload
	//     },
	//     [fetchPhotos.pending.type]: (state) => {
	//         state.isLoading = true
	//     },
	//     [fetchPhotos.rejected.type]: (state, action: PayloadAction<string>) => {
	//         state.isLoading = false
	//         state.error = action.payload
	//     }
	// }
})
export default photoSlice.reducer
