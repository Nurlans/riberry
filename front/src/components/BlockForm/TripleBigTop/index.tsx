import React, { FC } from 'react'
import './index.scss'
import { IBlock } from '../../../models/IBlock'

const TripleBigBottom: FC<IBlock> = ({
	item,
	baseUrl,
	reverse,
	columnReverse
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: columnReverse ? 'column-reverse' : 'column'
			}}
		>
			<div className='triple-big-top__row-2'>
				<div className='triple-big-top__row-2__middle'>
					<img
						src={baseUrl + item?.attributes.images.data[0].attributes.url}
						alt=''
					/>
				</div>
			</div>
			<div
				className='triple-big-top__row-1'
				style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
			>
				<div className='triple-big-top__row-1__small'>
					<img
						src={baseUrl + item?.attributes.images.data[4].attributes.url}
						alt=''
					/>
				</div>
				<div className='triple-big-top__row-1__large'>
					<img
						src={baseUrl + item?.attributes.images.data[3].attributes.url}
						alt=''
					/>
				</div>
			</div>
		</div>
	)
}

export default TripleBigBottom
