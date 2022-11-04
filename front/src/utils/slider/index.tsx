import React from 'react'
import Slider from 'react-slick'
import './index.scss'

const baseUrl = 'http://localhost:1337'

const SliderComponent = ({ sliderItems }: any) => {
	const settings = {
		className: 'center',
		infinite: false,
		centerPadding: '60px',
		slidesToShow: 5,
		swipeToSlide: true
	}
	return (
		// <div></div>
		<Slider {...settings}>
			{sliderItems.map((item: string) => (
				<img src={baseUrl + item} alt='' />
			))}
		</Slider>
	)
}

export default SliderComponent
