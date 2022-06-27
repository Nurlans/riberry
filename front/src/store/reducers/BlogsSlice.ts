import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchBlogs} from "./ActionCreators";
import {IBlogs} from "../../models/Blogs";

interface BlogsState {
    isLoading: boolean,
    error: string,
    blogs: IBlogs[]
}

const initialState: BlogsState = {
    isLoading: false,
    error: '',
    blogs:[]

}
export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBlogs.fulfilled.type]: (state, action: PayloadAction<IBlogs[]>) => {
            state.isLoading = false
            state.error = ''
            state.blogs = action.payload
        },
        [fetchBlogs.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchBlogs.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})
export default blogsSlice.reducer