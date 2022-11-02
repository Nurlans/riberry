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
			{isLoading ? (
				<>Loading...</>
			) : (
				!burgerMenu && (
					<div className='about-us'>
						<div className='about-us__company'>
							<div className='about-us__company__info'>
								<h2 className='about-us__company__info__name'>
									{t('Studio “Riberry”')}
								</h2>
								<p>
									{t(
										'"Riberry" is a unique interior design and engineering studio, which has no analogues in the Baku market.'
									)}
									{/*"Riberry" - это уникальная студия по дизайну интерьеров и*/}
									{/*проектированию, аналогов которой ещё не было на Бакинском рынке.*/}
								</p>
								<p>
									{t(
										'Our distinguishing feature is our focus on high world standards in the field of design and architecture, which makes it easier to work with clients, make it comfortable, easy and fast, as well as achieve the best result in the shortest possible time!'
									)}
									{/*Нашей отличительной чертой является ориентированность на высокие*/}
									{/*мировые стандарты в сфере дизайна и архитектуры, что позволяет*/}
									{/*облегчить процесс работы с клиентами, сделать его комфортным,*/}
									{/*легким и быстрым, а также добиться наилучшего результата за*/}
									{/*минимальный срок!*/}
									{!readMore && (
										<span
											className='read-more'
											onClick={() => setReadMore(true)}
										>
											{t(' read more')}
										</span>
									)}
								</p>

								{readMore && (
									<>
										<p>
											{t(
												'The design studio "Riberry" was created in 2013 and during this time we have designed over 200 objects both in Azerbaijan and in Russia, and the feedback from grateful clients inspires us with confidence and give us the right to call ourselves professionals in the field of design and architecture!'
											)}
											{/*Студия дизайна "Riberry" была создана в 2013 году и за это*/}
											{/*время нами было спроектировано свыше 200 объектов как на*/}
											{/*территории Азербайджана, так и в России, а отзывы*/}
											{/*благодарных клиентов внушают нам уверенность и дают право*/}
											{/*называть себя профессионалами в сфере дизайна и архитектуры!*/}
										</p>
										<p>
											{t(
												'By contacting "Riberry" you can be sure that you will get exactly what you wanted! Our philosophy is to strive to ensure that the result exceeds the expectations of the client, which is why the studio works in different styles and directions, so that each client can find with us what he will like!'
											)}
											{/*Обращаясь в "Riberry" Вы можете быть уверены, что получите*/}
											{/*именно то, что хотели! Наша философия - стремиться к тому,*/}
											{/*чтобы результат превзошел ожидания клиента, именно поэтому*/}
											{/*студия работает в разных стилях и направлениях, чтобы каждый*/}
											{/*клиент смог отыскать у нас то, что придется ему по душе!*/}
										</p>
										<p>
											{t(
												'We give guarantees for our work and offer a comprehensive service for the implementation of your turnkey design project by our company.'
											)}
											{/*Мы даём гарантии на свои работы и предлагаем комплексную*/}
											{/*услугу по воплощению Вашего дизайн-проекта "под ключ" нашей*/}
											{/*компанией.*/}
										</p>
										<p>
											{t(
												'But the most important thing is love for your work, thanks to which you get a truly high-quality, stylish and beautiful design with well-thought-out ergonomics, placement of furniture, appliances and communications!'
											)}
											{/*Но самое главное - это любовь к своей работе,*/}
											{/*благодаря которой Вы*/}
										</p>
										<p>
											{t(
												'We are sure that by contacting us, you will be satisfied and will remember with gratitude about our design studio "Riberry"!'
											)}
										</p>
									</>
								)}
							</div>
							<div className='about-us__company__example'>
								<BigMiddleThree images={info.attributes.images} />
							</div>
						</div>
						<h2 className='about-us__person__post-mobile'>
							{t('Director and creative director of the studio "Riberry"')}
						</h2>
						<div className='about-us__person'>
							<div className='about-us__person__photo'>
								<img
									src={
										baseUrl + info.attributes.personPhoto.data[0].attributes.url
									}
									alt=''
								/>
							</div>
							<div className='about-us__person__bio'>
								<h2 className='about-us__person__post'>
									{t('Director and creative director of the studio "Riberry"')}
								</h2>
								<h1 className='about-us__person__name'>
									{t('Alina Kozlova.')}
								</h1>
								<p>{t('She was born in Novosibirsk, Russia.')}</p>
								<p>
									{t(
										"In 2011 she graduated from the Novosibirsk State Academy of Architecture and Art (NSAAA) with a bachelor's degree in the department of urban planning and landscape design and planning."
									)}
								</p>
								<p>
									{t(
										'After graduating from the academy, she moved to Azerbaijan and worked for two years in the local market in Baku.'
									)}
								</p>
								<p>
									{t(
										'In 2013, she founded the creative studio of interior design "Riberry".'
									)}
								</p>
								<p>
									{t(
										'For more than six years of work, the studio has designed more than 200 objects both in Azerbaijan and in Russia, and this is far from the limit!'
									)}
								</p>
								<p>
									{t(
										'One of the main principles of the company is the belief that EVERY client can find what he is looking for with us! That is why, when forming the staff of my studio, it was important for me to bring together designers with different tastes and visions!'
									)}
								</p>
								<p>
									{t(
										'I sincerely believe that the most basic thing a client is looking for when contacting our studio is understanding! After all, only a listening and attentive designer will be able to understand exactly what YOU need and offer YOUR unique product!'
									)}
								</p>
							</div>
						</div>
					</div>
				)
			)}
		</>
	)
}

export default AboutUs
