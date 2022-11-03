import { IImage } from './IImage'
import { IDesc } from './IDesc'

export interface IBlogs {
	id: number | null
	attributes: {
		blog_date: string
		blog_title: string
		blog_description: string
		blog_Img: {
			data: IImage
		}
		blog_desc: IDesc
	}
}
