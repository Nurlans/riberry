import React, { FC } from 'react'
import Slider from 'react-slick'

interface FilterSlider {
	selectedType: string[]
	selectedStyle: string[]
	handleChange: (value: any, type: string) => void
}

const FilterSlider: FC<FilterSlider> = ({
	selectedType,
	selectedStyle,
	handleChange
}) => {
	const settings = {
		className: 'center',
		infinite: true,
		centerPadding: '10px',
		slidesToShow: 3,
		swipeToSlide: true,
		arrows: false,
		centerMode: true,
		slidesToScroll: 4
		// adaptiveHeight: true
	}
	return (
		<Slider {...settings}>
			{selectedType.map(item => (
				<div
					style={{ margin: '5px' }}
					onClick={() => {
						handleChange({ target: { value: item } }, 'selectedType')
						console.log(selectedStyle, selectedType, 'sssss')
					}}
					className='mobile-filter-selected'
				>
					{item}
					{/*<img src={close_btn} alt='Close' />*/}
				</div>
			))}
			{selectedStyle.map(item => (
				<div
					style={{ margin: '5px' }}
					onClick={() => {
						handleChange({ target: { value: item } }, 'selectedStyle')
					}}
					className='mobile-filter-selected'
				>
					{item}
					{/*<img src={close_btn} alt='Close' />*/}
				</div>
			))}
		</Slider>
	)
}

export default FilterSlider
