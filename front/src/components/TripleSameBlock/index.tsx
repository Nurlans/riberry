import React, { FC } from 'react'
import { IBlock } from '../../models/IBlock'
import './index.scss'

const TripleSameBlock: FC<IBlock> = ({ item, baseUrl }) => {
	return (
		<>
			<div className='triple-same__row-1'>
				<div className='triple-same__row-1-item'>
					<img
						src={baseUrl + item?.attributes.images.data[0].attributes.url}
						alt=''
					/>
				</div>
				<div className='triple-same__row-1-item'>
					<img
						src={baseUrl + item?.attributes.images.data[1].attributes.url}
						alt=''
					/>
				</div>
			</div>
			<div className='triple-same__row-2'>
				<div className='triple-same__row-2-item'>
					<img
						src={baseUrl + item?.attributes.images.data[2].attributes.url}
						alt=''
					/>
				</div>
			</div>
		</>
	)
}

export default TripleSameBlock
