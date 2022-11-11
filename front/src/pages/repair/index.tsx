import React, { useEffect } from 'react'
import PriceInfoBlock from '../../components/PriceInfoBlock'
import './index.scss'
import PriceInfoStage from '../../components/PriceInfoStage'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	fetchRepairStages,
	fetchServicePricesStages
} from '../../store/reducers/ActionCreators'
import { IStage } from '../../models/IStages'
import Loader from '../../components/Loader/Loader'
import { useTranslation } from 'react-i18next'

const Repair = () => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const { stages, error, isLoading } = useAppSelector(
		state => state.stageReducer
	)
	const priceBlocks = [
		{
			id: 1,
			title: t('Work and materials (1 м²)'),
			price: 500,
			moreInfo: false
		}
	]
	useEffect(() => {
		dispatch(fetchRepairStages())
	}, [])
	return isLoading ? (
		<Loader />
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

export default Repair
