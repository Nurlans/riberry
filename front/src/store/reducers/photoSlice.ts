import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPhoto, IPhotoTotalInfo} from "../../models/IPhoto";
import {fetchPhotos} from "./ActionCreators";

interface PhotoState {
    photos: IPhoto[],
    isLoading: boolean,
    error: string,
    selectedNavPage: string,
    pageCount: number
}


const initialState: PhotoState = {
    photos: [],
    isLoading: false,
    error: '',
    selectedNavPage: '/interior',
    pageCount: 0
}


export const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        photosByFilterFetching(state) {
            state.isLoading = true
        },
        photosByFilterFetchingSuccess(state, action: PayloadAction<IPhotoTotalInfo>) {
            state.isLoading = false
            state.error = ''
            state.photos = action.payload.data
            state.pageCount = action.payload.meta.pagination.pageCount
        },
        photosByFilterFetchingError(state, action: PayloadAction<IPhoto[]>) {
            state.isLoading = false
        },
        photosByPaginationFetching(state) {
            state.isLoading = true
        },
        photosByPaginationFetchingSuccess(state, action: PayloadAction<IPhotoTotalInfo>) {
            state.error = ''
            state.photos = state.photos.concat(action.payload.data)
            state.pageCount = action.payload.meta.pagination.pageCount
            state.isLoading = false
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
            state.isLoading = false
        },
    },
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
