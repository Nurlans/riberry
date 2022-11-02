import { IPhoto } from './IPhoto'

export interface IBlock {
	item: IPhoto
	baseUrl: string
	reverse?: boolean
	columnReverse?: boolean
}
