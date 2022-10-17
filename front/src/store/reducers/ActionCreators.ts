import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IImages } from '../../models/IImage'
import { IAboutUsResponse } from '../../models/IAboutUs'
import { AppDispatch } from '../store'
import { photoSlice } from './photoSlice'

const baseUrl = 'http://localhost:1337/api/'

export const selectNavPage = (page: string) => ({
	type: 'photos/selectNavPage',
	payload: page
})
export const openBurgerMenu = (value: boolean) => ({
	type: 'burger/openBurger',
	payload: value
})
export const openFilterMenu = (value: boolean) => ({
	type: 'burger/openFilter',
	payload: value
})
export const openSelectedFilter = (value: boolean) => ({
	type: 'burger/openSelectedFilter',
	payload: value
})
export const addTypeAction = (value: string) => ({
	type: 'filter/addType',
	payload: value
})
export const addStyleAction = (value: string) => ({
	type: 'filter/addStyle',
	payload: value
})
export const deleteTypeAction = (value: string) => ({
	type: 'filter/deleteType',
	payload: value
})
export const deleteStyleAction = (value: string) => ({
	type: 'filter/deleteStyle',
	payload: value
})
export const clearAllStylesAction = () => ({
	type: 'filter/clearAllStyles'
})
export const clearAllTypesAction = () => ({
	type: 'filter/clearAllTypes'
})

export const clearPhotoState = () => ({
	type: 'photos/clearState'
})

export const fetchPhotos = createAsyncThunk(
	'photo/fetchAll',
	async (_, thunkApi) => {
		const response = await axios.get<IImages>(baseUrl + 'items?populate=*')
		return response.data.data
	}
)
export const fetchPhotoById = createAsyncThunk(
	'photo/fetchAll',
	async (id: string | undefined, thunkApi) => {
		const response = await axios.get<IImages>(
			baseUrl + `items/${id}?populate=*`
		)
		return response.data.data
	}
)

export const fetchPhotosByFilter =
	(
		selectedType: string[],
		selectedStyle: string[],
		selectedPage?: string,
		page?: number
	) =>
	async (dispatch: AppDispatch) => {
		try {
			const typeFilter = selectedType.join('&filters[place_type]=')
			const styleFilter = selectedStyle?.join('&filters[place_style]=')
			const selectedFilter = selectedPage?.substring(1) || ''
			dispatch(photoSlice.actions.photosByFilterFetching())
			const response = await axios.get(
				baseUrl +
					`items?${
						typeFilter?.length > 0 ? `filters[place_type]=` + typeFilter : ''
					}${
						styleFilter?.length > 0
							? `&filters[place_style]=` + styleFilter
							: ''
					}${
						selectedFilter?.length > 0
							? `&filters[kind_of_place]=` + selectedFilter
							: ''
					}&pagination[page]=${page}&pagination[pageSize]=10&populate=*`
			)
			dispatch(photoSlice.actions.photosByFilterFetchingSuccess(response.data))
		} catch (e: any) {
			dispatch(photoSlice.actions.photosByFilterFetchingError(e.message))
		}
	}

export const photosByPagination =
	(
		selectedType: string[],
		selectedStyle: string[],
		selectedPage?: string,
		page?: number
	) =>
	async (dispatch: AppDispatch) => {
		try {
			const typeFilter = selectedType.join('&filters[place_type]=')
			const styleFilter = selectedStyle?.join('&filters[place_style]=')
			const selectedFilter = selectedPage?.substring(1) || ''
			dispatch(photoSlice.actions.photosByPaginationFetching())
			const response = await axios.get(
				baseUrl +
					`items?${
						typeFilter?.length > 0 ? `filters[place_type]=` + typeFilter : ''
					}${
						styleFilter?.length > 0
							? `&filters[place_style]=` + styleFilter
							: ''
					}${
						selectedFilter?.length > 0
							? `&filters[kind_of_place]=` + selectedFilter
							: ''
					}&pagination[page]=${page}&pagination[pageSize]=10&populate=*`
			)
			dispatch(
				photoSlice.actions.photosByPaginationFetchingSuccess(response.data)
			)
		} catch (e: any) {
			dispatch(photoSlice.actions.photosByPaginationFetchingError(e.message))
		}
	}

// export const fetchRightPhotos = createAsyncThunk(
//     'photo/fetchAllRight',
//     async (_, thunkApi) => {
//         const response = await axios.get<IImages>(baseUrl + 'right-blocks?populate=*')
//         return response.data.data
//     }
// )
export const fetchInfoAboutUs = createAsyncThunk(
	'aboutUs/about',

	async (_, thunkApi) => {
		const response = await axios.get<IAboutUsResponse>(
			baseUrl + 'about-uses?populate=*'
		)
		return response.data.data[0]
	}
)

export const fetchServicePricesStages = createAsyncThunk(
	'servicePrices/stages',

	async (_, thunkApi) => {
		const response = await axios.get<IAboutUsResponse>(
			baseUrl + 'design-stages?populate=*'
		)
		return response.data.data
	}
)
export const fetchBlogs = createAsyncThunk('blogs', async (_, thunkApi) => {
	const response = await axios.get<IAboutUsResponse>(
		baseUrl + 'blogs?populate=*'
	)
	return response.data.data
})
export const fetchBlog = createAsyncThunk(
	'blog',
	async (id: string | undefined, thunkApi) => {
		const response = await axios.get<IAboutUsResponse>(
			baseUrl + `blogs/${id}?populate=*`
		)
		return response.data.data
	}
)
