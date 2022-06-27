import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPhoto} from "../../models/IPhoto";
import {fetchPhotos} from "./ActionCreators";

interface PhotoState {
    photos: IPhoto[],
    isLoading: boolean,
    error: string,
    selectedNavPage: string
}


const initialState: PhotoState = {
    photos: [],
    isLoading: false,
    error: '',
    selectedNavPage: '/interior'
}

// const selectNavPage = createAction(SELECT_NAV_PAGE)

export const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        photosByFilterFetching(state) {
            state.isLoading = true
        },
        photosByFilterFetchingSuccess(state, action: PayloadAction<IPhoto[]>) {
            state.isLoading = false
            state.error = ''
            state.photos = action.payload
        },
        photosByFilterFetchingError(state, action: PayloadAction<IPhoto[]>) {
            state.isLoading = false
        },
        selectNavPage: (state, action: PayloadAction<string>) => {
            state.selectedNavPage = action.payload
            // state.isLoading = false
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
