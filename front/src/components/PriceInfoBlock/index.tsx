import React from 'react'
import './index.scss'

// const azn = require('../../assets/azn.svg').default

interface PriceInfoBlockProps {
	title: string
	price?: number
	moreInfo?: boolean
	to100?: string
	from100to200?: string
	from200?: string
	id?: number
}

const PriceInfoBlock = ({
	title,
	price,
	moreInfo = true,
	to100,
	from100to200,
	from200,
	id
}: PriceInfoBlockProps) => {
	return (
		<div
			className='price-info-main'
			style={{ width: moreInfo || id === 11 ? '32.8%' : '24%' }}
		>
			<div className='price-info'>
				<div className='price-info__title'>{title}</div>
				<div className='price-info__num'>
					{!price ? (
						<div style={{ padding: '10px' }} />
					) : (
						<>
							{price} <span> &#8380; </span>
						</>
					)}
				</div>
			</div>
			{moreInfo && (
				<div className='more-info'>
					<div className='more-info-item'>
						<div className='more-info__square'></div>
						{to100 && (
							<div className='price-info__num'>
								{to100} <span> &#8380; </span>
							</div>
						)}
					</div>
					<div className='more-info-item'>
						<div className='more-info__square'>100-200 м²</div>
						{from100to200 && (
							<div className='price-info__num'>
								{from100to200} <span> &#8380; </span>
							</div>
						)}
					</div>
					<div className='more-info-item'>
						<div className='more-info__square'>200 м²</div>
						{from200 && <div className='price-info__num'>{from200}</div>}
					</div>
				</div>
			)}
		</div>
	)
}

export default PriceInfoBlock
