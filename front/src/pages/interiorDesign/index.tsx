import React, { useEffect, useMemo } from 'react'
import PriceInfoBlock from '../../components/PriceInfoBlock'
import './index.scss'
import PriceInfoStage from '../../components/PriceInfoStage'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchServicePricesStages } from '../../store/reducers/ActionCreators'
import { IStage } from '../../models/IStages'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader/Loader'

const InteriorDesign = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const { stages, error, isLoading } = useAppSelector(
		state => state.stageReducer
	)
	useEffect(() => {
		dispatch(fetchServicePricesStages())
	}, [])
	const priceBlocksValue = useMemo(
		() => [
			{ id: 11, title: t('Planning (1 m²)'), price: 12, moreInfo: false },
			{
				id: 2,
				title: t('3D Visualization (1 m²)'),
				price: 0,
				moreInfo: true,
				to100: '27',
				from100to200: '18',
				from200: t('Treaty')
			},
			{
				id: 3,
				title: t('Landscape design (1 m²)'),
				price: 0,
				moreInfo: true,
				to100: '35',
				from100to200: '25',
				from200: t('Treaty')
			}
		],
		[t]
	)
	// const priceBlocks =
	return isLoading ? (
		<Loader />
	) : (
		<>
			<div className='price-info-wrapper'>
				{priceBlocksValue.map(priceItem => (
					<PriceInfoBlock
						id={priceItem.id}
						key={priceItem.id}
						to100={priceItem.to100}
						from200={priceItem.from200}
						from100to200={priceItem.from100to200}
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
		</>
	)
}

export default InteriorDesign
