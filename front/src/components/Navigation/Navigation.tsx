import React, { useEffect, useState } from 'react'
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
const showFilterPath = ['/', '/public', '/landscape', '/realization']

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
	setShowAllStyleFilters = () => null
}: NavigationProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [showTypes, setShowTypes] = useState<boolean>(false)
	const [showStyles, setShowStyles] = useState<boolean>(false)
	const [selectedNav, setSelectedNav] = useState<number>(1)
	const { burgerMenu, showFilter } = useAppSelector(
		state => state.burgerMenuReducer
	)
	const { selectedStyle, selectedType } = useAppSelector(
		state => state.filterReducer
	)
	const location = useLocation()
	const leftNav = [
		{ id: '1', title: t('Portfolio'), path: '/' },
		{ id: '2', title: t('About'), path: '/about-us' },
		{ id: '3', title: t('Services and prices'), path: '/services-prices' },
		{ id: '4', title: t('Blog'), path: '/blogs' },
		{ id: '5', title: t('Contacts'), path: '/contacts' }
	]

	const handleChange = (event: any, type: string) => {
		const {
			target: { value }
		} = event
		if (type === 'selectedType') {
			if (selectedType.find((item: string) => item === value)) {
				dispatch(deleteTypeAction(value))
			} else {
				dispatch(addTypeAction(value))
			}
		} else {
			if (selectedStyle.find((item: string) => item === value)) {
				dispatch(deleteStyleAction(value))
			} else {
				dispatch(addStyleAction(value))
			}
		}
	}

	const handleChangeShowTypes = () => {
		// console.log('222')
		setShowTypes(!showTypes)
		setShowAllTypeFilters(false)
		setSelectedNav(1)
	}
	const handleChangeShowStyle = () => {
		setShowStyles(!showStyles)
		setShowAllStyleFilters(false)
		setSelectedNav(2)
	}
	const placeTypeByPath = (pathname: any, mobile?: boolean) => {
		let typesForShow = []

		if (pathname === '/') {
			typesForShow = [...interiorPlaceType]
		} else if (pathname === '/public') {
			typesForShow = [...publicPlaceType]
		} else if (pathname === '/landscape') {
			typesForShow = [...landscapePlaceType]
		} else {
			typesForShow = [...realizationPlaceType]
		}
		return mobile ? (
			<>
				{typesForShow.map((type: { id: number; value: string }) => (
					<div
						onClick={() => {
							handleChange({ target: { value: type.value } }, 'selectedType')
						}}
						className={
							!!selectedType.find(item => item === type.value)
								? 'mobile-filter-selected'
								: 'mobile-filter'
						}
						key={type.id}
					>
						{t(`${type.value}`)}
					</div>
				))}
			</>
		) : (
			<>
				{typesForShow.map((type: { id: number; value: string }) => (
					<li key={type.id}>
						<input
							value={type.value}
							onChange={e => handleChange(e, 'selectedType')}
							checked={!!selectedType.find(item => item === type.value)}
							type='checkbox'
						/>
						{t(`${type.value}`)}
					</li>
				))}
			</>
		)
	}

	const placeStyleByPath = (pathname: any, mobile?: boolean) => {
		let stylesForShow = []
		if (pathname === '/') {
			stylesForShow = [...interiorPlaceStyle]
		} else if (pathname === '/public') {
			stylesForShow = [...publicPlaceStyle]
		} else if (pathname === '/landscape') {
			stylesForShow = [...landscapePlaceStyle]
		} else {
			stylesForShow = [...realizationPlaceStyle]
		}
		return mobile ? (
			<>
				{stylesForShow.map((type: { id: number; value: string }) => (
					<div
						onClick={() => {
							handleChange({ target: { value: type.value } }, 'selectedStyle')
						}}
						className={
							!!selectedStyle.find(item => item === type.value)
								? 'mobile-filter-selected'
								: 'mobile-filter'
						}
						key={type.id}
					>
						{t(`${type.value}`)}

						{/*{type.value}*/}
					</div>
				))}
			</>
		) : (
			<>
				{stylesForShow.map((type: { id: number; value: string }) => (
					<li key={type.id}>
						<input
							value={type.value}
							onChange={e => handleChange(e, 'selectedStyle')}
							checked={!!selectedStyle.find(item => item === type.value)}
							type='checkbox'
						/>
						{/*{type.value}*/}
						{t(`${type.value}`)}
					</li>
				))}
			</>
		)
	}
	return (
		<>
			<div
				style={{ display: !showFilter && burgerMenu ? 'block' : 'none' }}
				className='navigation-left'
			>
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
				{showFilterPath.find(path => path === location.pathname) && (
					<div className='filter-block'>
						<div
							onClick={handleChangeShowTypes}
							className='filter-place-type__title'
						>
							<img src={type__filter} alt='' />
							<div>{t('Place type')}</div>
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
											dispatch(clearAllTypesAction())
											dispatch(clearPhotoState())
										}}
										className='filter-place-type__cancel'
									>
										<u>Отменить всё</u>
									</div>
								)}
								{location && placeTypeByPath(location?.pathname)}
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
							<div>{t('Place style')}</div>
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
											dispatch(clearAllStylesAction())
											dispatch(clearPhotoState())
										}}
										className='filter-place-type__cancel'
									>
										<u>Отменить всё</u>
									</div>
								)}
								{location && placeStyleByPath(location?.pathname)}
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
			{showFilter && !burgerMenu && (
				<div className='navigation-left mobile'>
					<div className='Tabs'>
						<ul className='nav filter-tabs'>
							<li onClick={() => setSelectedNav(1)}>
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
										{t('Place type')}
									</div>
									<img width={10} src={arrow__down} alt='' />
								</div>
							</li>
							<li onClick={() => setSelectedNav(2)}>
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
										{t('Place style')}
									</div>
									<img width={10} src={arrow__down} alt='' />
								</div>
							</li>
						</ul>
						<div className='outlet'>
							{selectedNav === 1 && (
								<div className='mobile-filter__wrapper'>
									{location && placeTypeByPath(location.pathname, true)}
								</div>
							)}
							{selectedNav === 2 && (
								<div className='mobile-filter__wrapper'>
									{location && placeStyleByPath(location.pathname, true)}
								</div>
							)}
							<div
								onClick={() => {
									dispatch(openFilterMenu(false))
									dispatch(openSelectedFilter(true))
								}}
								className='mobile-filter__wrapper__btn-apply'
							>
								Применить
							</div>
						</div>
					</div>
				</div>
			)}
			{/*<div className='navigation-left'>*/}
			{/*	<ul className='navigation-left__items'>*/}
			{/*		{leftNav.map(item => (*/}
			{/*			<NavLink*/}
			{/*				onClick={() => dispatch(openBurgerMenu(false))}*/}
			{/*				className={*/}
			{/*					location.pathname === item.path*/}
			{/*						? 'navigation-left__item selected'*/}
			{/*						: 'navigation-left__item '*/}
			{/*				}*/}
			{/*				key={item.id}*/}
			{/*				to={item.path}*/}
			{/*			>*/}
			{/*				{item.title}*/}
			{/*			</NavLink>*/}
			{/*		))}*/}
			{/*	</ul>*/}
			{/*	{showFilterPath.find(path => path === location.pathname) && (*/}
			{/*		<FilterBlock*/}
			{/*			setSelectedNav={setSelectedNav}*/}
			{/*			setShowAllStyleFilters={setShowAllStyleFilters}*/}
			{/*			setShowAllTypeFilters={setShowAllTypeFilters}*/}
			{/*		/>*/}
			{/*	)}*/}
			{/*</div>*/}
		</>
	)
}

export default Navigation
