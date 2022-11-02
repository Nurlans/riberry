import { IImages } from './IImage'
import { Language } from '../utils/enum'
import { IDesc } from './IDesc'

export interface IPhoto {
	id: number
	attributes: {
		id: number
		title: string
		place_type: string
		place_style: string
		blockForm: string
		area: number
		description: string
		country: string
		city: string
		images: IImages
		path: string
		desc: IDesc
	}
}

export interface IPhotoTotalInfo {
	data: IPhoto[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}
