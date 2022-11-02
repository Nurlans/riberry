import React, { FC } from 'react'
import { IBlock } from '../../../models/IBlock'
import './index.scss'
const DoubleBlock: FC<IBlock> = ({ item, baseUrl }) => {
	return (
		<div className='double-block'>
			<div className='double-block__row-1'>
				<img
					src={baseUrl + item?.attributes.images.data[0].attributes.url}
					alt=''
				/>
			</div>
			<div className='double-block__row-2'>
				<img
					src={baseUrl + item?.attributes.images.data[1].attributes.url}
					alt=''
				/>
			</div>
		</div>
	)
}

export default DoubleBlock
