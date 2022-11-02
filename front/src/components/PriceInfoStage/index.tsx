import React from 'react'
import './index.scss'
import { IStage } from '../../models/IStages'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

const baseUrl = 'http://localhost:1337'

interface PriceInfoStageProps {
	stage: IStage
}

const PriceInfoStage = ({ stage }: PriceInfoStageProps) => {
	const { t } = useTranslation()
	return (
		<div className='stage'>
			<div className='stage-number'>
				<div>
					{t('Stage')} {stage.attributes.stage}
				</div>
			</div>
			<div className='stage-body'>
				<div className='stage-body__left'>
					<div className='stage-number-large'>
						<div>ЭТАП {stage.attributes.stage}</div>
					</div>
					<div className='stage-title'>{stage.attributes.stage_title}</div>
					<ReactMarkdown>{stage.attributes.stage_description}</ReactMarkdown>
				</div>
				<div className='stage-body__right'>
					<img
						src={baseUrl + stage.attributes.stage_image.data[0].attributes.url}
						alt=''
					/>
				</div>
			</div>
		</div>
	)
}

export default PriceInfoStage
