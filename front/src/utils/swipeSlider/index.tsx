import React, { Dispatch, SetStateAction } from 'react'
import Slider from 'react-slick'
import { NavLink } from 'react-router-dom'
import { selectNavPage } from '../../store/reducers/ActionCreators'
import { useAppDispatch } from '../../hooks/redux'
import './index.scss'

interface SwipeToSlideProps {
	headerLinks: { id: number; title: string; path: string }[]
	setIsActive: Dispatch<SetStateAction<number>>
	isActive: number
}

const SwipeToSlide = ({
	headerLinks,
	setIsActive,
	isActive
}: SwipeToSlideProps) => {
	const dispatch = useAppDispatch()
	const settings = {
		className: 'center',
		infinite: true,
		centerPadding: '10px',
		slidesToShow: 3,
		swipeToSlide: true,
		arrows: false,
		centerMode: true,
		slidesToScroll: 4
	}

	return (
		<Slider {...settings}>
			{headerLinks.map(link => (
				<div key={link.id}>
					<NavLink
						className={isActive === link.id ? 'design selectedType' : 'design'}
						onClick={() => {
							setIsActive(link.id)
							dispatch(selectNavPage(link.path))
						}}
						to={link.path}
					>
						{link.title}
					</NavLink>
				</div>
			))}
		</Slider>
	)
}

export default SwipeToSlide
