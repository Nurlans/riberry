import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const logo = require('../../assets/logo.svg').default
const fb = require('../../assets/fb.svg').default
const phone = require('../../assets/phone.svg').default
const mail = require('../../assets/mail.svg').default
const inst = require('../../assets/inst.svg').default

const Footer = () => {
	const { t } = useTranslation()
	const email = 'info@riberry.az'
	const mobile = '(+994) 55 220 65 65'

	return (
		<footer>
			{/*<div className='footer'/>*/}
			<div className='footer-body'>
				<div className='footer-body__left'>
					<p className='footer__title'>{t('Contact us')}</p>
					<p className='footer-contact'>
						<img src={phone} alt='' />{' '}
						<a className='footer-telephone' href={`tel:${mobile}`}>
							{mobile}
						</a>
					</p>
					<p className='footer-contact'>
						<img src={mail} alt='' />
						<a className='footer-email' href={`mailto:${email}`}>
							{email}
						</a>
					</p>
					<p>
						<a
							className='footer-social'
							href='https://www.facebook.com/Riberry/'
						>
							<img src={fb} alt='' />
						</a>
						<a
							className='footer-social'
							href='https://www.instagram.com/riberry_design/'
						>
							<img src={inst} alt='' />
						</a>
					</p>
				</div>
				<div className='footer-body__right'>
					<NavLink to='/'>
						<img src={logo} alt='' />
					</NavLink>
				</div>
			</div>
		</footer>
	)
}

export default Footer
