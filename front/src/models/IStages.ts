import { IDesc, ITitle } from './IDesc'

export interface IStages {
	data: IStage[]
}

export interface IStage {
	id: number | null
	attributes: {
		stage: string
		stage_image: {
			data: {
				id: string
				attributes: {
					name: string
					width: number
					height: number
					url: string
				}
			}
		}
		stage_desc: IDesc
		stage_title: ITitle
	}
}
