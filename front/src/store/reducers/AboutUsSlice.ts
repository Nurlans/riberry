import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchInfoAboutUs} from "./ActionCreators";
import {IAboutUs} from "../../models/IAboutUs";

interface AboutUsState {
    isLoading: boolean,
    error: string,
    info: IAboutUs
}

const initialState: AboutUsState = {
    isLoading: false,
    error: '',
    info: {
        id: null,
        attributes: {
            title: '',
            description: '',
            title2: '',
            name: ' ',
            text: ' ',
            personInfo: ' ',
            personPhoto: {
                data: [{
                    id: 0,
                    attributes: {
                        name: '',
                        width: 0,
                        height: 0,
                        url: '',
                    }
                }]
            },
            images: {
                data: [{
                    id: 0,
                    attributes: {
                        name: '',
                        width: 0,
                        height: 0,
                        url: '',
                    }
                }]
            }
        }


    }

}
export const infoAboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchInfoAboutUs.fulfilled.type]: (state, action: PayloadAction<IAboutUs>) => {
            state.isLoading = false
            state.error = ''
            state.info = action.payload
        },
        [fetchInfoAboutUs.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchInfoAboutUs.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})
export default infoAboutSlice.reducer