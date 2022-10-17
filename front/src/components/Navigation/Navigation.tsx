import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
	interiorPlaceStyle,
	interiorPlaceType,
	landscapePlaceStyle,
	landscapePlaceType,
	publicPlaceStyle,
	publicPlaceType,
	realizationPlaceStyle,
	realizationPlaceType
} from '../../utils/enum'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	addStyleAction,
	addTypeAction,
	clearAllStylesAction,
	clearAllTypesAction,
	clearPhotoState,
	deleteStyleAction,
	deleteTypeAction,
	openBurgerMenu,
	openFilterMenu,
	openSelectedFilter
} from '../../store/reducers/ActionCreators'
import './Navigation.scss'

const logo = require('../../assets/logo.svg').default
const type__filter = require('../../assets/type__filter.svg').default
const style__filter = require('../../assets/style.svg').default
const arrow__down = require('../../assets/arrow-down.png')

interface NavigationProps {
	showAllStyleFilters?: boolean
	showAllTypeFilters?: boolean
	setShowAllStyleFilters?: (item: boolean) => void
	setShowAllTypeFilters?: (item: boolean) => void
	setPage?: (i: number) => void
}

const Navigation = ({
	showAllStyleFilters = false,
	showAllTypeFilters = false,
	setShowAllTypeFilters = () => null,
	setShowAllStyleFilters = () => null,
	setPage = () => null
}: NavigationProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const leftNav = [
		{ id: '1', title: 'Портфолио', path: '/' },
		{ id: '2', title: 'Кто мы?', path: '/about-us' },
		{ id: '3', title: 'Услуги и цены', path: '/services-prices' },
		{ id: '4', title: t('Blog'), path: '/blogs' },
		{ id: '5', title: 'Контакты', path: '/contacts' }
	]
	const screenWidth = window.screen.width
	const location = useLocation()
	const [showTypes, setShowTypes] = useState(false)
	const [showStyles, setShowStyles] = useState(false)
	const { burgerMenu, showFilter } = useAppSelector(
		state => state.burgerMenuReducer
	)
	const { selectedStyle, selectedType } = useAppSelector(
		state => state.filterReducer
	)
	const [selectedNav, setSelectedNav] = useState(1)

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
	const [selectedTab, setSelectedTab] = useState('tab1')
	const handleChangeShowTypes = () => {
		setShowTypes(!showTypes)
		setShowAllTypeFilters(false)
		setSelectedNav(1)
	}
	const handleChangeShowStyle = () => {
		setShowStyles(!showStyles)
		setShowAllStyleFilters(false)
		setSelectedNav(2)
	}
	const placeTypeByPath = () => {
		if (location.pathname === '/') {
			return interiorPlaceType.map((type: { id: number; value: string }) => (
				<li key={type.id}>
					<input
						value={type.value}
						onChange={e => {
							handleChange(e, 'selectedType')
							setPage(1)
						}}
						checked={!!selectedType.find(item => item === type.value)}
						type='checkbox'
					/>
					{type.value}
					<span className='checkmark'> </span>
				</li>
			))
		} else if (location.pathname === '/public') {
			return publicPlaceType.map((type: { id: number; value: string }) => (
				<li key={type.id}>
					<input
						value={type.value}
						onChange={e => handleChange(e, 'selectedType')}
						checked={!!selectedType.find(item => item === type.value)}
						type='checkbox'
					/>
					{type.value}
				</li>
			))
		} else if (location.pathname === '/landscape') {
			return landscapePlaceType.map((type: { id: number; value: string }) => (
				<li key={type.id}>
					<input
						value={type.value}
						onChange={e => handleChange(e, 'selectedType')}
						checked={!!selectedType.find(item => item === type.value)}
						type='checkbox'
					/>
					{type.value}
				</li>
			))
		} else if (location.pathname === '/realization') {
			realizationPlaceType.map((type: { id: number; value: string }) => (
				<li key={type.id}>
					<input
						value={type.value}
						onChange={e => handleChange(e, 'selectedType')}
						checked={!!selectedType.find(item => item === type.value)}
						type='checkbox'
					/>
					{type.value}
				</li>
			))
		}
	}

	return (
		<>
			{((screenWidth < 1024 && burgerMenu) || screenWidth > 1024) && (
				<div className='navigation-left'>
					<ul>
						{leftNav.map(item => (
							<NavLink
								onClick={() => dispatch(openBurgerMenu(false))}
								className={
									location.pathname === item.path
										? 'navigation-left__item selected'
										: 'navigation-left__item '
								}
								key={item.id}
								to={item.path}
							>
								{item.title}
							</NavLink>
						))}
					</ul>
					{(location.pathname === '/' ||
						location.pathname === '/public' ||
						location.pathname === '/landscape' ||
						location.pathname === '/realization') &&
						screenWidth > 1024 && (
							<div className='filter-block'>
								<div
									onClick={handleChangeShowTypes}
									className='filter-place-type__title'
								>
									<img src={type__filter} alt='' />
									<div> Тип помещения</div>
									<img width={10} src={arrow__down} alt='' />
								</div>
								{showTypes && (
									<ul
										style={
											showAllTypeFilters
												? { maxHeight: '100vh' }
												: { maxHeight: '24vh' }
										}
										className='filter-place-type'
									>
										{selectedType.length > 0 && (
											<div
												onClick={() => {
													// setSelectedType([])

													dispatch(clearAllTypesAction())
													dispatch(clearPhotoState())
												}}
												className='filter-place-type__cancel'
											>
												<u>Отменить всё</u>
											</div>
										)}
										{location && placeTypeByPath()}
									</ul>
								)}
								{!showAllTypeFilters && showTypes && (
									<button
										className='show-all-filter-btn'
										onClick={() => setShowAllTypeFilters(true)}
									>
										<u>Ещё</u>
									</button>
								)}
								<div
									onClick={handleChangeShowStyle}
									className='filter-place-type__title'
								>
									<img src={style__filter} alt='' />
									<div>Стиль помещения</div>
									<img width={10} src={arrow__down} alt='' />
								</div>
								{showStyles && (
									<ul
										style={
											showAllStyleFilters
												? { maxHeight: '100vh' }
												: { maxHeight: '24vh' }
										}
										className='filter-place-type'
									>
										{selectedStyle.length > 0 && (
											<div
												onClick={() => {
													// setSelectedStyle([])

													dispatch(clearAllStylesAction())
													dispatch(clearPhotoState())
												}}
												className='filter-place-type__cancel'
											>
												<u>Отменить всё</u>
											</div>
										)}
										{location &&
											location.pathname === '/' &&
											interiorPlaceStyle.map(
												(type: { id: number; value: string }) => (
													<li key={type.id}>
														<input
															value={type.value}
															onChange={e => handleChange(e, 'selectedStyle')}
															checked={
																!!selectedStyle.find(
																	item => item === type.value
																)
															}
															type='checkbox'
														/>
														{type.value}
													</li>
												)
											)}
										{location &&
											location.pathname === '/public' &&
											publicPlaceStyle.map(
												(type: { id: number; value: string }) => (
													<li key={type.id}>
														<input
															value={type.value}
															onChange={e => handleChange(e, 'selectedStyle')}
															checked={
																!!selectedStyle.find(
																	item => item === type.value
																)
															}
															type='checkbox'
														/>
														{type.value}
													</li>
												)
											)}
										{location &&
											location.pathname === '/landscape' &&
											landscapePlaceStyle.map(
												(type: { id: number; value: string }) => (
													<li key={type.id}>
														<input
															value={type.value}
															onChange={e => handleChange(e, 'selectedStyle')}
															checked={
																!!selectedStyle.find(
																	item => item === type.value
																)
															}
															type='checkbox'
														/>
														{type.value}
													</li>
												)
											)}
										{location &&
											location.pathname === '/realization' &&
											realizationPlaceStyle.map(
												(type: { id: number; value: string }) => (
													<li key={type.id}>
														<input
															value={type.value}
															onChange={e => handleChange(e, 'selectedStyle')}
															checked={
																!!selectedStyle.find(
																	item => item === type.value
																)
															}
															type='checkbox'
														/>
														{type.value}
													</li>
												)
											)}
									</ul>
								)}
								<button
									className='show-all-filter-btn'
									onClick={() => {
										setShowAllStyleFilters(true)
									}}
								>
									{!showAllStyleFilters && showStyles && <u>Ещё</u>}
								</button>
							</div>
						)}
				</div>
			)}
			{screenWidth < 1024 && showFilter && !burgerMenu && (
				<div className='navigation-left'>
					<div className='Tabs'>
						<ul className='nav filter-tabs'>
							<li onClick={() => setSelectedTab('tab1')}>
								<div
									onClick={handleChangeShowTypes}
									className='filter-place-type__title'
								>
									<img src={type__filter} alt='' />
									<div
										style={{
											borderBottom: selectedNav === 1 ? '1px solid white' : ''
										}}
									>
										Тип помещения
									</div>
									<img width={10} src={arrow__down} alt='' />
								</div>
							</li>
							<li onClick={() => setSelectedTab('tab2')}>
								<div
									onClick={handleChangeShowStyle}
									className='filter-place-type__title'
								>
									<img src={style__filter} alt='' />
									<div
										style={{
											borderBottom: selectedNav === 2 ? '1px solid white' : ''
										}}
									>
										Стиль помещения
									</div>
									<img width={10} src={arrow__down} alt='' />
								</div>
							</li>
						</ul>
						<div className='outlet'>
							{selectedTab === 'tab1' ? (
								<>
									<div className='mobile-filter__wrapper'>
										{location &&
											location.pathname === '/' &&
											interiorPlaceType.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedType'
															)
														}
														className={
															!!selectedType.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
										{location &&
											location.pathname === '/public' &&
											publicPlaceType.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedType'
															)
														}
														className={
															!!selectedType.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
										{location &&
											location.pathname === '/landscape' &&
											landscapePlaceType.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedType'
															)
														}
														className={
															!!selectedType.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
										{location &&
											location.pathname === '/realization' &&
											realizationPlaceType.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedType'
															)
														}
														className={
															!!selectedType.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
									</div>
									<div
										onClick={() => {
											dispatch(openFilterMenu(false))
											dispatch(openSelectedFilter(true))
										}}
										className='mobile-filter__wrapper__btn-apply'
									>
										Применить
									</div>
								</>
							) : (
								<>
									<div className='mobile-filter__wrapper'>
										{location &&
											location.pathname === '/' &&
											interiorPlaceStyle.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedStyle'
															)
														}
														className={
															!!selectedStyle.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
										{location &&
											location.pathname === '/public' &&
											publicPlaceStyle.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedStyle'
															)
														}
														className={
															!!selectedStyle.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
										{location &&
											location.pathname === '/landscape' &&
											landscapePlaceStyle.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedStyle'
															)
														}
														className={
															!!selectedStyle.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
										{location &&
											location.pathname === '/realization' &&
											realizationPlaceStyle.map(
												(type: { id: number; value: string }) => (
													<div
														onClick={() =>
															handleChange(
																{ target: { value: type.value } },
																'selectedStyle'
															)
														}
														className={
															!!selectedStyle.find(item => item === type.value)
																? 'mobile-filter-selected'
																: 'mobile-filter'
														}
														key={type.id}
													>
														{type.value}
													</div>
												)
											)}
									</div>
									<div
										onClick={() => dispatch(openFilterMenu(false))}
										className='mobile-filter__wrapper__btn-apply'
									>
										Применить
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Navigation
