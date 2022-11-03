import React, { useEffect } from 'react'
import PriceInfoBlock from '../../components/PriceInfoBlock'
import { IStage } from '../../models/IStages'
import PriceInfoStage from '../../components/PriceInfoStage'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	fetchArchStages,
	fetchServicePricesStages
} from '../../store/reducers/ActionCreators'
import { useTranslation } from 'react-i18next'

const Architecture = () => {
	const { stages, error, isLoading } = useAppSelector(
		state => state.stageReducer
	)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	useEffect(() => {
		dispatch(fetchArchStages())
	}, [])
	const priceBlocks = [
		{ id: 1, title: t('Planning (1 m²)'), price: 12, moreInfo: false },
		{ id: 2, title: t('3D Visualization (1 m²)'), price: 18, moreInfo: false },
		{
			id: 3,
			title: t('Design project (1 m²)'),
			price: 35,
			moreInfo: false
		},
		{
			id: 4,
			title: t('Landscape design (1 m²)'),
			price: 150,
			moreInfo: false
		}
	]
	return isLoading ? (
		<>Loading..</>
	) : (
		<div>
			<div className='price-info-wrapper'>
				{priceBlocks.map(priceItem => (
					<PriceInfoBlock
						key={priceItem.id}
						title={priceItem.title}
						price={priceItem.price}
						moreInfo={priceItem.moreInfo}
					/>
				))}
			</div>
			<div className='stages-wrapper'>
				{stages.map((stage: IStage) => (
					<PriceInfoStage key={stage.id} stage={stage} />
				))}
			</div>
		</div>
	)
}

export default Architecture
