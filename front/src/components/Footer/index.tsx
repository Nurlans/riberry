import React from 'react';
import './index.scss'

const fb = require('../../assets/fb.svg').default
const inst = require('../../assets/inst.svg').default
const Footer = () => {
    const email = 'info@riberry.az'
    const mobile = '(+994) 55 220 65 65'
    return (
        <footer>
            <div className='footer'/>
            <div className='footer-body'>
                <div className='footer-body__left'>
                    <p className='footer__title'>
                        СВЯЖИТЕСЬ С НАМИ!
                    </p>
                    <p><a className='footer-telephone' href={`tel:${mobile}`}>{mobile}</a></p>
                    <p><a className='footer-email' href={`mailto:${email}`}>{email}</a></p>
                </div>
                <div className='footer-body__right'>
                    <a href="https://www.facebook.com/Riberry/"><img src={fb} alt=""/></a>
                    <a href="https://www.instagram.com/riberry_design/"><img src={inst} alt=""/></a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;