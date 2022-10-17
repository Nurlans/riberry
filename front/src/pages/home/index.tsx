import React, { useEffect, useRef, useState } from 'react'
import { IPhoto } from '../../models/IPhoto'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	addStyleAction,
	addTypeAction,
	clearAllStylesAction,
	clearAllTypesAction,
	clearPhotoState,
	deleteStyleAction,
	deleteTypeAction,
	fetchPhotosByFilter,
	openFilterMenu,
	openSelectedFilter,
	photosByPagination
} from '../../store/reducers/ActionCreators'
import './index.scss'
import { NavLink } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import FilterSlider from '../../components/FilterSlider'

const arrowBack = require('../../assets/arrow-left.svg').default
const close_btn = require('../../assets/close_btn.svg').default

const baseUrl = 'http://localhost:1337'

const Home = () => {
	const dispatch = useAppDispatch()
	const [showAllTypeFilters, setShowAllTypeFilters] = useState(false)
	const [showAllStyleFilters, setShowAllStyleFilters] = useState(false)
	const { photos, rightPhotos, error, pageCount, isLoading, selectedNavPage } =
		useAppSelector(state => state.photoReducer)
	const { burgerMenu, showFilter } = useAppSelector(
		state => state.burgerMenuReducer
	)
	const { selectedStyle, selectedType } = useAppSelector(
		state => state.filterReducer
	)
	const [page, setPage] = useState(1)
	const [fetching, setFetching] = useState(false)
	const lastElement: any = useRef()
	const observer: any = useRef()
	// useEffect(() => {
	//     setPage(1)
	//     dispatch(photosByPagination(selectedType, selectedStyle, selectedNavPage, page))
	// }, [selectedStyle, selectedType])
	const handleChange = (event: any, type: string) => {
		const {
			target: { value }
		} = event
		if (type === 'selectedType') {
			if (selectedType.find((item: string) => item === value)) {
				dispatch(deleteTypeAction(value))
				// setSelectedType(selectedType.filter((item: string) => item !== value))
			} else {
				dispatch(addTypeAction(value))
				// setSelectedType([...selectedType, value])
			}
		} else {
			if (selectedStyle.find((item: string) => item === value)) {
				dispatch(deleteStyleAction(value))
				// setSelectedStyle([
				// 	...selectedStyle.filter((item: string) => item !== value)
				// ])
			} else {
				dispatch(addStyleAction(value))
				// setSelectedStyle([...selectedStyle, value])
			}
		}
	}

	useEffect(() => {
		console.log('paginationUse')
		if (page === 1 && photos.length > 1) {
			dispatch(clearPhotoState())
		}

		dispatch(
			photosByPagination(selectedType, selectedStyle, selectedNavPage, page)
		)
	}, [page, selectedStyle, selectedType])

	useEffect(() => {
		setPage(1)
		if (selectedType.length > 0) {
			dispatch(clearAllTypesAction())
			// setSelectedType([])
		}
		if (selectedStyle.length > 0) {
			dispatch(clearAllStylesAction())

			// setSelectedStyle([])
		}
		setShowAllTypeFilters(false)
		setShowAllStyleFilters(false)
		dispatch(
			fetchPhotosByFilter(selectedType, selectedStyle, selectedNavPage, page)
		)

		return () => {
			dispatch(clearPhotoState())
		}
	}, [selectedNavPage])

	useEffect(() => {
		if (isLoading) return
		if (observer.current) observer.current.disconnect()
		const callback = function (entries: any, observer: any) {
			if (entries[0].isIntersecting && page < pageCount) {
				setPage(page + 1)
			}
		}
		observer.current = new IntersectionObserver(callback)
		observer.current.observe(lastElement.current)
	}, [isLoading])

	return (
		<>
			{isLoading && (!photos?.length || !rightPhotos?.length) ? (
				<>Loading..</>
			) : (
				<>
					<Navigation
						setPage={setPage}
						showAllStyleFilters={showAllStyleFilters}
						showAllTypeFilters={showAllTypeFilters}
						setShowAllStyleFilters={setShowAllStyleFilters}
						setShowAllTypeFilters={setShowAllTypeFilters}
					/>

					<div
						className='columns-wrapper'
						style={{ display: showFilter || burgerMenu ? 'none' : 'flex' }}
					>
						<div className='selected-filter'>
							{selectedType.length || selectedStyle.length ? (
								<>
									<div className='selected-filter__nav'>
										<div
											onClick={() => dispatch(openFilterMenu(true))}
											className='selected-filter__nav__back'
										>
											<img src={arrowBack} alt='Back' />
											<div>Фильтр</div>
										</div>
										<div
											className='selected-filter__nav__clear'
											onClick={() => {
												dispatch(clearAllStylesAction())
												dispatch(clearAllTypesAction())
												dispatch(openSelectedFilter(false))
												dispatch(clearPhotoState())
											}}
										>
											Очистить
										</div>
									</div>
									<FilterSlider
										selectedType={selectedType}
										selectedStyle={selectedStyle}
										handleChange={handleChange}
									/>
									{/*{selectedType.map(item => (*/}
									{/*	<div*/}
									{/*		style={{ margin: '5px' }}*/}
									{/*		onClick={() => {*/}
									{/*			handleChange(*/}
									{/*				{ target: { value: item } },*/}
									{/*				'selectedType'*/}
									{/*			)*/}
									{/*			console.log(selectedStyle, selectedType, 'sssss')*/}
									{/*		}}*/}
									{/*		className='mobile-filter-selected'*/}
									{/*	>*/}
									{/*		{item}*/}
									{/*		<img src={close_btn} alt='Close' />*/}
									{/*	</div>*/}
									{/*))}*/}
									{/*{selectedStyle.map(item => (*/}
									{/*	<div*/}
									{/*		style={{ margin: '5px' }}*/}
									{/*		onClick={() => {*/}
									{/*			handleChange(*/}
									{/*				{ target: { value: item } },*/}
									{/*				'selectedStyle'*/}
									{/*			)*/}
									{/*		}}*/}
									{/*		className='mobile-filter-selected'*/}
									{/*	>*/}
									{/*		{item}*/}
									{/*		<img src={close_btn} alt='Close' />*/}
									{/*	</div>*/}
									{/*))}*/}
								</>
							) : null}
						</div>
						<div className='columns'>
							{(!showFilter && !burgerMenu && photos?.length && (
								<>
									<div className='left-column'>
										{photos?.map((item: IPhoto, i: number) => {
											if (i % 8 === 0) {
												return (
													<div key={item?.id} className='left-block'>
														<NavLink
															className='img-wrapper'
															to={`/moreInfo/${item?.id}`}
														>
															<div className='top'>
																<div className='adaptive'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[0].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div>
																	<div className='adaptive'>
																		<img
																			src={
																				baseUrl +
																				item?.attributes.images.data[1]
																					.attributes.url
																			}
																			alt=''
																		/>
																	</div>
																	<div className='adaptive'>
																		<img
																			src={
																				baseUrl +
																				item?.attributes.images.data[2]
																					.attributes.url
																			}
																			alt=''
																		/>
																	</div>
																</div>
															</div>

															<div className='bottom'>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[3].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[4].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															{!(burgerMenu || showFilter) && (
																<InfoBlock item={item} />
															)}
														</NavLink>
													</div>
												)
											} else if (i % 8 === 1) {
												return (
													<div key={item?.id} className='left-block'>
														<NavLink
															className='img-wrapper'
															to={`/moreInfo/${item?.id}`}
														>
															<div className='top'>
																<div className='adaptive small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[0].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[1].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															<div className='bottom'>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[2].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[3].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[4].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															{!(burgerMenu || showFilter) && (
																<InfoBlock item={item} />
															)}
														</NavLink>
													</div>
												)
											} else if (i % 8 === 2) {
												return (
													<div key={item?.id} className='left-block'>
														<NavLink
															className='img-wrapper'
															to={`/moreInfo/${item?.id}`}
														>
															<div className='top'>
																<div className='adaptive'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[0].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[1].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															<div className='bottom'>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[2].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[3].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[4].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															{!(burgerMenu || showFilter) && (
																<InfoBlock item={item} />
															)}
														</NavLink>
													</div>
												)
											} else if (i % 8 === 3) {
												return (
													<div key={item?.id} className='left-block '>
														<NavLink
															className='img-wrapper'
															to={`/moreInfo/${item?.id}`}
														>
															<div className='top'>
																<div className='adaptive small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[0].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[1].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															<div className='bottom'>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[2].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[3].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[4].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															{!(burgerMenu || showFilter) && (
																<InfoBlock item={item} />
															)}
														</NavLink>
													</div>
												)
											}
										})}
									</div>
									<div className='right-column'>
										{rightPhotos?.map((item: IPhoto, i: number) => {
											if (i % 2 === 0) {
												return (
													<div key={item?.id} className='right-block '>
														<NavLink
															className='img-wrapper'
															to={`/moreInfo/${item?.id}`}
														>
															<div className='top'>
																<div className='adaptive'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[0].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															<div className='bottom'>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[1].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[2].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															{!(burgerMenu || showFilter) && (
																<InfoBlock item={item} />
															)}
														</NavLink>
													</div>
												)
											} else if (i % 2 === 1) {
												return (
													<div key={item?.id} className='right-block '>
														<NavLink
															className='img-wrapper'
															to={`/moreInfo/${item?.id}`}
														>
															<div className='top'>
																<div>
																	<div className='adaptive'>
																		<img
																			src={
																				baseUrl +
																				item?.attributes.images.data[1]
																					.attributes.url
																			}
																			alt=''
																		/>
																	</div>
																	<div className='adaptive'>
																		<img
																			src={
																				baseUrl +
																				item?.attributes.images.data[2]
																					.attributes.url
																			}
																			alt=''
																		/>
																	</div>
																</div>
																<div className='adaptive'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[0].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>
															<div className='bottom'>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[3].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
																<div className='adaptive-small'>
																	<img
																		src={
																			baseUrl +
																			item?.attributes.images.data[4].attributes
																				.url
																		}
																		alt=''
																	/>
																</div>
															</div>

															{!(burgerMenu || showFilter) && (
																<InfoBlock item={item} />
															)}
														</NavLink>
													</div>
												)
											}
										})}
									</div>
								</>
							)) ||
								'Фото отсутвсвует'}
						</div>

						{/*<div className='selected-filter'></div>*/}
						<div ref={lastElement} style={{ height: '1px' }} />
					</div>
				</>
			)}
		</>
	)
}

interface InfoBlockProps {
	item: IPhoto
}

const InfoBlock = ({ item }: InfoBlockProps) => {
	return (
		<div className='block_info'>
			<div className='block_info-square'>
				{item?.attributes.place_type}, {item?.attributes.area} m²
			</div>
			<div className='block_info-title'>{item?.attributes.place_style}</div>
			<div className='block_info-country'>
				{item?.attributes.city}, {item?.attributes.country}
			</div>
		</div>
	)
}
export default Home
