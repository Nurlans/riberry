import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import './index.scss'
import InteriorDesign from '../interiorDesign'
import Architecture from '../architecture'
import Repair from '../repair'
import Navigation from '../../components/Navigation/Navigation'
import { useTranslation } from 'react-i18next'

const baseUrl = 'http://localhost:1337'

const ServicesPrices = () => {
	const dispatch = useAppDispatch()
	const { t, i18n } = useTranslation()
	const [activeTab, setActiveTab] = useState('tab1')
	const { burgerMenu } = useAppSelector(state => state.burgerMenuReducer)
	return (
		<>
			<Navigation />

			{!burgerMenu && (
				<div className='Tabs'>
					{/* Tab nav */}
					<ul className='nav'>
						<li
							className={activeTab === 'tab1' ? 'selected-tab' : ''}
							onClick={() => setActiveTab('tab1')}
						>
							{t('Interior design')}
						</li>
						<li
							className={activeTab === 'tab2' ? 'selected-tab' : ''}
							onClick={() => setActiveTab('tab2')}
						>
							{t('Architecture, landscape design')}
						</li>
						<li
							className={activeTab === 'tab3' ? 'selected-tab' : ''}
							onClick={() => setActiveTab('tab3')}
						>
							{t('Repair')}
						</li>
					</ul>
					<div className='outlet'>
						{activeTab === 'tab1' ? (
							<InteriorDesign />
						) : activeTab === 'tab2' ? (
							<Architecture />
						) : (
							<Repair />
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default ServicesPrices
