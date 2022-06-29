import React, {useEffect, useState} from 'react';
import './Header.scss'
import {NavLink, useLocation, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {openBurgerMenu, openFilterMenu, selectNavPage} from "../../store/reducers/ActionCreators";
import burgerMenuReducer from "../../store/reducers/BurgerMenuSlice";
import SwipeToSlide from "../../utils/swipeSlider";


const logo = require('../../assets/logo.svg').default
const filter = require('../../assets/filter.svg').default

interface HeaderProps {

}

const Header = () => {
    const location = useLocation();
    const {t, i18n} = useTranslation()
    const [isActive, setIsActive] = useState(1)
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('ru')
    const dispatch = useAppDispatch()
    const {selectedNavPage} = useAppSelector(state => state.photoReducer)
    const {burgerMenu, showFilter} = useAppSelector(state => state.burgerMenuReducer)
    const screenWidth = window.screen.width
    const params = useParams()
    const headerLinks = [
        {id: 1, title: t('Interiors'), path: '/'},
        {id: 2, title: t('Общественные места'), path: '/public'},
        {id: 3, title: t('Экстерьный, ланшафтный дизайн'), path: '/landscape'},
        {id: 4, title: t('Реализация'), path: '/realization'},
    ]


    const setLanguage = (lang: string,) => {
        i18n.changeLanguage(lang, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key'); // -> same as i18next.t
        });
    }
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
        setLanguage(event.target.value)
    }
    const handleBurgerMenu = () => {
        dispatch(openBurgerMenu(!burgerMenu))
    }
    const handleFilterMenu = () => {
        dispatch(openFilterMenu(!showFilter))
    }
    const id = location.pathname.split('/')
    return (
        <>
        {
            location.pathname !== `/moreInfo/${id[id?.length-1]}` &&
                <>
                    {headerLinks.find((link) => location.pathname === link.path)
                        ? <nav className="navigation">
                            <NavLink to='/' className="brand-name">
                                <img src={logo} alt=""/>
                            </NavLink>
                            <div onClick={handleFilterMenu} className='mobile-filter-btn'>
                                <img src={filter} alt=""/>
                            </div>
                            <div onClick={handleBurgerMenu}
                                 className={burgerMenu ? "icon-three active-three" : "icon-three"}>
                                <div className="hamburger  hamburger-three"></div>
                            </div>
                            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                                <ul>
                                    {headerLinks.map(link => (
                                        <li key={link.id}>
                                            <NavLink onClick={() => {
                                                if (link.path === '/') {
                                                    dispatch(selectNavPage('/interior'))
                                                } else {
                                                    dispatch(selectNavPage(link.path))
                                                }
                                                setIsActive(link.id)


                                            }} className={link.id === isActive ? "selected" : ""}
                                                     to={link.path}>{link.title}</NavLink>
                                        </li>
                                    ))}
                                    <select className='select-language' value={selectedLanguage}
                                            onChange={handleSelectChange}>
                                        <option value='ru'>Ru</option>
                                        <option value='az'>Az</option>
                                        <option value='en'>En</option>
                                    </select>
                                </ul>
                            </div>
                        </nav>
                        : <nav className="navigation only-lang">
                            <NavLink to="/" className="brand-name">
                                <img src={logo} alt=""/>
                            </NavLink>

                            <div onClick={() => dispatch(openBurgerMenu(!burgerMenu))}
                                 className={burgerMenu ? "icon-three active-three" : "icon-three"}>
                                <div className="hamburger  hamburger-three"></div>
                            </div>
                            <select className='select-language' value={selectedLanguage}
                                    onChange={handleSelectChange}>
                                <option value='ru'>Ru</option>
                                <option value='az'>Az</option>
                                <option value='en'>En</option>
                            </select>
                            {/*<ServicesPricesTabs activeTab={activeTab} setActiveTab={setActiveTab}/>*/}
                        </nav>}
                    {
                        headerLinks.find((link) => location.pathname === link.path)
                        && (screenWidth < 600 && !burgerMenu && !showFilter)
                        &&
                        <>
                            <div className='header__slider'>
                                <SwipeToSlide setIsActive={setIsActive} headerLinks={headerLinks}/>
                            </div>

                        </>

                    }
                </>
        }
        </>


    )
        ;
};

export default Header;