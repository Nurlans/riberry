import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import { NavLink } from 'react-router-dom'
import './index.scss'
import SliderComponent from '../../utils/slider'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslation } from 'react-i18next'
import { photosByPagination } from '../../store/reducers/ActionCreators'

const Contacts = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { photos, error, isLoading, selectedNavPage } = useAppSelector(
		state => state.photoReducer
	)
	const [ourProjects, setOurProjects] = useState<any>([])

	useEffect(() => {
		//localhost:1337/api/items?&pagination[page]=1&pagination[pageSize]=10&populate=*
		// if (!photos.length) {
		dispatch(photosByPagination([], [], '', 1))
		const ourProjects = [
			...photos
				?.map(item => item.attributes.images.data)
				.map(photos => photos.map(i => i.attributes.url))
		]
		let sliderItems = [].concat.apply(
			[],
			ourProjects.map((i: any) => i)
		)
		setOurProjects(sliderItems)
	}, [])
	// let sliderItems: any[] = []
	// sliderItems = [].concat.apply(
	// 	[],
	// 	ourProjects.map((i: any) => i)
	// )
	const { burgerMenu, showFilter } = useAppSelector(
		state => state.burgerMenuReducer
	)

	return (
		<>
			<Navigation />

			{isLoading ? (
				<>Loading...</>
			) : (
				!burgerMenu &&
				!showFilter && (
					<div className='contacts'>
						<h2 className='contacts__title'>{t('Our contacts')}</h2>
						<ul className='contacts__list'>
							<li>
								{t('Telephone: ')}
								<a href='tel:(+994) 55 220 65 65'>(+994) 55 220 65 65</a>
							</li>
							<li>
								Whatsapp:{' '}
								<a href='tel:(+994) 55 220 65 65'>(+994) 55 220 65 65</a>
							</li>
							<li>
								{t('E-mail: ')}
								{/*Электронная почта:{' '}*/}
								<a href='mailto:info@riberry.az'>info@riberry.az</a>
							</li>
							<li>
								{t('Site: ')}
								{/*Сайт: */}
								<NavLink to='/'>riberry.az</NavLink>
							</li>
							<li>
								{t('Address: ')}
								{/*Адрес: */}
								{t('56 Ashig Molla Juma, Baku')}
							</li>
						</ul>
						<iframe
							className='maps'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d326.30001439847484!2d49.85746493805557!3d40.41355381113214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403087ff2a64c273%3A0xe1c2b5cd66bff72c!2sMinera%20MMC!5e0!3m2!1sen!2s!4v1655457356004!5m2!1sen!2s'
							width='98%'
							height='450'
							style={{ border: 0 }}
							allowFullScreen={true}
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						></iframe>
						<h4 className='contacts-our-projects'> Наши проекты </h4>
						{ourProjects.length ? (
							<div className='slider__wrapper'>
								<SliderComponent sliderItems={ourProjects} />
							</div>
						) : null}
					</div>
				)
			)}
		</>
	)
}

export default Contacts
