import React, { FC } from 'react'
import { IBlock } from '../../../models/IBlock'
import './index.scss'
const OneImgBlock: FC<IBlock> = ({ item, baseUrl }) => {
	return (
		<div className='one-img'>
			<img
				src={baseUrl + item?.attributes.images.data[0].attributes.url}
				alt=''
			/>
		</div>
	)
}

export default OneImgBlock
