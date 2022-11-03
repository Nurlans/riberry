import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBlog, fetchBlogs } from './ActionCreators'
import { IBlogs } from '../../models/IBlogs'

interface BlogState {
	isLoading: boolean
	error: string
	blog_description: string
	blog: IBlogs
}

const initialState: BlogState = {
	isLoading: false,
	error: '',
	blog_description: '',
	blog: {
		id: null,
		attributes: {
			blog_date: '',
			blog_title: '',
			blog_description: '',
			blog_Img: {
				data: {
					id: null,
					attributes: {
						name: '',
						width: 0,
						height: 0,
						url: ''
					}
				}
			},
			blog_desc: {
				az: '',
				en: '',
				ru: '',
				id: 0
			}
		}
	}
}
export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchBlog.fulfilled.type]: (state, action: PayloadAction<IBlogs>) => {
			state.isLoading = false
			state.error = ''
			state.blog = action.payload
		},
		[fetchBlog.pending.type]: state => {
			state.isLoading = true
		},
		[fetchBlog.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		}
	}
})
export default blogSlice.reducer
