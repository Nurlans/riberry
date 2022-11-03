import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchServicePricesStages } from './ActionCreators'
import { IStage, IStages } from '../../models/IStages'

interface PhotoState {
	stages: IStage[]
	isLoading: boolean
	error: string
}

const initialState: PhotoState = {
	stages: [
		{
			id: null,
			attributes: {
				stage: '0',
				stage_image: {
					data: [
						{
							id: '',
							attributes: {
								name: '',
								width: 0,
								height: 0,
								url: ''
							}
						}
					]
				},
				stage_desc: {
					az: '',
					ru: '',
					en: '',
					id: 0
				},
				stage_title: {
					az: '',
					ru: '',
					en: '',
					id: 0
				}
			}
		}
	],
	isLoading: false,
	error: ''
}
export const stageSlice = createSlice({
	name: 'stage',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchServicePricesStages.fulfilled.type]: (
			state,
			action: PayloadAction<IStage[]>
		) => {
			state.isLoading = false
			state.error = ''
			state.stages = action.payload
		},
		[fetchServicePricesStages.pending.type]: state => {
			state.isLoading = true
		},
		[fetchServicePricesStages.rejected.type]: (
			state,
			action: PayloadAction<string>
		) => {
			state.isLoading = false
			state.error = action.payload
		}
	}
})
export default stageSlice.reducer
