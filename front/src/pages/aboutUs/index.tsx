import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchInfoAboutUs } from '../../store/reducers/ActionCreators'
import BigMiddleThree from '../../components/BlockForm/BigMiddleThree'
import './index.scss'
import ReactMarkdown from 'react-markdown'
import Navigation from '../../components/Navigation/Navigation'
import { useTranslation } from 'react-i18next'

const baseUrl = 'http://localhost:1337'

const AboutUs = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { info, isLoading } = useAppSelector(state => state.aboutUsReducer)
	useEffect(() => {
		dispatch(fetchInfoAboutUs())
	}, [])
	const { burgerMenu } = useAppSelector(state => state.burgerMenuReducer)
	const [readMore, setReadMore] = useState(false)

	return (
		<>
			<Navigation />
			{isLoading && 'Loading...'}
			{!burgerMenu && (
				<div className='about-us'>
					<div className='about-us-top__body'>
						<div className='about-us-top__body-left'>
							<h2 className='about-us-top__body-title'>Студия “Riberry”</h2>
							<p>
								{' '}
								"Riberry" - это уникальная студия по дизайну интерьеров и
								проектированию, аналогов которой ещё не было на Бакинском рынке.
							</p>
							<p>
								{' '}
								Нашей отличительной чертой является ориентированность на высокие
								мировые стандарты в сфере дизайна и архитектуры, что позволяет
								облегчить процесс работы с клиентами, сделать его комфортным,
								легким и быстрым, а также добиться наилучшего результата за
								минимальный срок!
								{!readMore && (
									<span className='read-more' onClick={() => setReadMore(true)}>
										{t(' read more')}
									</span>
								)}
							</p>

							{readMore && (
								<>
									<p>
										Студия дизайна "Riberry" была создана в 2013 году и за это
										время нами было спроектировано свыше 200 объектов как на
										территории Азербайджана, так и в России, а отзывы
										благодарных клиентов внушают нам уверенность и дают право
										называть себя профессионалами в сфере дизайна и архитектуры!
									</p>
									<p>
										Обращаясь в "Riberry" Вы можете быть уверены, что получите
										именно то, что хотели! Наша философия - стремиться к тому,
										чтобы результат превзошел ожидания клиента, именно поэтому
										студия работает в разных стилях и направлениях, чтобы каждый
										клиент смог отыскать у нас то, что придется ему по душе!
									</p>
									<p>
										Мы даём гарантии на свои работы и предлагаем комплексную
										услугу по воплощению Вашего дизайн-проекта "под ключ" нашей
										компанией.
									</p>
									<p>
										{' '}
										Но самое главное - это любовь к своей работе, благодаря
										которой Вы
									</p>
								</>
							)}
						</div>
						<BigMiddleThree images={info.attributes.images} />
					</div>
					<div className='about-us-bottom__body'>
						<h2 className='about-us-bottom__body-right__title mobile-title'>
							Директор и творческий руководитель студии “Riberry”
						</h2>
						<div className='about-us-bottom__body-left'>
							<img
								src={
									baseUrl + info.attributes.personPhoto.data[0].attributes.url
								}
								alt=''
							/>
						</div>
						<div className='about-us-bottom__body-right'>
							<h2 className='about-us-bottom__body-right__title'>
								Директор и творческий руководитель студии “Riberry”
							</h2>
							<h1 className='about-us-bottom__body__name'>Алина Козлова</h1>
							<p>Родилась в городе Новосибирск, Россия.</p>
							<p>
								В 2011 году окончила Новосибирскую Государственную
								Архитектурно-художественную Академию (НГАХА) со степенью
								бакалавра по кафедре градостроительного-ландшафтного
								проектирования и планирования.
							</p>
							<p>
								После окончания академии переехала в Азербайджан и два года
								работала на местном рынке города Баку.
							</p>
							<p>
								В 2013 году основала креативную студию интерьерного дизайна
								"Riberry".
							</p>
							<p>
								За более чем шестилетний срок работы студией было спроектировано
								более 200 объектов как на территории Азербайджана, так и в
								России и это далеко не предел!
							</p>
							<p>
								Один из главных принципов фирмы - это вера в то, что КАЖДЫЙ
								клиент сможет найти у нас то, что он ищет! Именно поэтому,
								формируя штат своей студии, для меня было важно собрать вместе
								дизайнеров с различными вкусами и видением!
							</p>
							<p>
								Я искренне верю в то, что самое основное, что ищет клиент,
								обращаясь в нашу студию - это понимание! Ведь только слушающий и
								внимательный дизайнер сможет точно понять что нужно именно ВАМ и
								предложить именно ВАШ уникальный продукт!
							</p>

							{/*<h2 '>*/}
							{/*	{info.attributes.title2}*/}
							{/*</h2>*/}
							{/*<h1 >*/}
							{/*	{info.attributes.name}*/}
							{/*</h1>*/}
							{/*<ReactMarkdown>{info.attributes.personInfo}</ReactMarkdown>*/}
						</div>
					</div>
					{/*<div className='about-us-bottom__body'>*/}
					{/*    <h2 className='about-us-bottom__body-right__title-mobile'>{info.attributes.title2}</h2>*/}
					{/*    <div className='about-us-bottom__body-left'>*/}
					{/*        <img src={baseUrl + info.attributes.personPhoto.data[0].attributes.url} alt=""/>*/}
					{/*    </div>*/}
					{/*    <div className='about-us-bottom__body-right'>*/}
					{/*        <h2 className='about-us-bottom__body-right__title'>{info.attributes.title2}</h2>*/}
					{/*        <h1 className='about-us-bottom__body__name'>{info.attributes.name}</h1>*/}
					{/*        <ReactMarkdown>*/}
					{/*            {info.attributes.personInfo}*/}
					{/*        </ReactMarkdown>*/}
					{/*    </div>*/}
					{/*</div>*/}
				</div>
			)}
		</>
	)
}

export default AboutUs
