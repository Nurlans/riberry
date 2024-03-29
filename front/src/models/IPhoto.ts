import { IImages } from './IImage'
import { IDesc, ITitle } from './IDesc'

export interface IPhoto {
	id: number
	attributes: {
		id: number
		item_title: ITitle
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
