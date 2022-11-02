import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchPhotoById } from '../../store/reducers/ActionCreators'
import './index.scss'
import ReactMarkdown from 'react-markdown'
import ImageGallery from 'react-image-gallery'
import { useTranslation } from 'react-i18next'

const arrowLeft = require('../../assets/arrow-left.svg').default
const closeBtn = require('../../assets/closeBtn.svg').default

const MoreInfo = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useAppDispatch()
	const [readMore, setReadMore] = useState(false)
	const { lang } = useAppSelector(state => state.settingsReducer)
	const { photosById, error, isLoading } = useAppSelector(
		state => state.photoByIdReducer
	)
	const params = useParams()
	const carouselPhotos = photosById?.attributes?.images?.data || []
	const images = [
		...carouselPhotos?.map(photo => ({
			original: 'http://localhost:1337' + photo.attributes.url,
			thumbnail: 'http://localhost:1337' + photo.attributes.url
		}))
	]

	// const lang = i18n.language || window.localStorage.i18nextLng
	console.log(lang, 'getLanguage')
	useEffect(() => {
		dispatch(fetchPhotoById(params.id))
	}, [])
	return isLoading ? (
		<> Loading..</>
	) : (
		<div className='about-repair__wrapper'>
			<div className='about-repair__mobile'>
				<div className='about-repair__mobile-top'>
					<NavLink to='/'>
						<img src={arrowLeft} alt='' />
					</NavLink>
					<div className='about-repair__mobile-top__title'>
						{photosById.attributes.place_type},{' '}
						{photosById.attributes.place_style},{photosById.attributes.area} m²
					</div>
				</div>
				<div className='about-repair__mobile-top__desc'>
					{photosById.attributes.desc[lang]?.length > 100 && readMore
						? photosById.attributes.desc[lang]
						: photosById.attributes.desc[lang]?.slice(0, 100)}
					{!readMore && photosById.attributes.description && (
						<span
							onClick={() => setReadMore(true)}
							className='about-repair__mobile-top__desc-more'
						>
							{t(' read more')}
						</span>
					)}
				</div>
			</div>

			<NavLink className='about-repair__wrapper-close__btn' to='/'>
				<img src={closeBtn} alt='Close' />
			</NavLink>
			<div>
				<ImageGallery
					showPlayButton={false}
					autoPlay={false}
					showFullscreenButton={false}
					items={images}
				/>
			</div>
			<div className='about-repair__mobile-photos'>
				{images.map(image => (
					<img
						className='about-repair__mobile-photo'
						src={image.original}
						alt=''
					/>
				))}
			</div>
			<div className='about-repair'>
				<div className='about-repair__title'>
					{photosById.attributes?.title}, {photosById.attributes?.city},{' '}
					{photosById.attributes?.area} m²
				</div>

				<div className='about-repair__description'>
					<ReactMarkdown>{photosById.attributes?.description}</ReactMarkdown>
				</div>
			</div>
		</div>
	)
}

export default MoreInfo
