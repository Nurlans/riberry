import React, {useEffect, useState} from 'react';
import {IPhoto} from "../../models/IPhoto";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchPhotos, fetchPhotosByFilter} from "../../store/reducers/ActionCreators";
import './index.scss'
import {NavLink, useLocation} from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";

const baseUrl = 'http://localhost:1337'


const Home = () => {
    const dispatch = useAppDispatch()
    const [selectedType, setSelectedType] = useState<string[]>([])
    const [selectedStyle, setSelectedStyle] = useState<string[]>([])
    const [showAllTypeFilters, setShowAllTypeFilters] = useState(false)
    const [showAllStyleFilters, setShowAllStyleFilters] = useState(false)
    const {photos, error, isLoading, selectedNavPage} = useAppSelector(state => state.photoReducer)
    const {burgerMenu, showFilter} = useAppSelector(state => state.burgerMenuReducer)

    //2request
    useEffect(() => {
        dispatch(fetchPhotosByFilter(selectedType, selectedStyle, selectedNavPage))
    }, [selectedType, selectedStyle])
    //1 request
    useEffect(() => {
        setSelectedType([])
        setSelectedStyle([])
        setShowAllTypeFilters(false)
        setShowAllStyleFilters(false)
        dispatch(fetchPhotosByFilter(selectedType, selectedStyle, selectedNavPage))
    }, [selectedNavPage])


    return (
        <>
            <Navigation selectedType={selectedType} setSelectedType={setSelectedType} selectedStyle={selectedStyle}
                        setSelectedStyle={setSelectedStyle}
                        showAllStyleFilters={showAllStyleFilters} showAllTypeFilters={showAllTypeFilters}
                        setShowAllStyleFilters={setShowAllStyleFilters}
                        setShowAllTypeFilters={setShowAllTypeFilters}/>
            {isLoading && "Loading"}
            <div className='main-block grid-wrapper'>
                {photos?.map((item: IPhoto, i: number) => {
                    if (i % 8 === 0 || i % 8 === 7) {
                        return (
                            <div key={item.id} className='left-block'>
                                <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
                                    <div className='top'>
                                        <div className='adaptive'>
                                            <img src={baseUrl + item.attributes.images.data[0].attributes.url}
                                                 alt=""/>
                                        </div>
                                        <div>
                                            <div className='adaptive'><img
                                                src={baseUrl + item.attributes.images.data[1].attributes.url}
                                                alt=""/></div>
                                            <div className='adaptive'><img
                                                src={baseUrl + item.attributes.images.data[2].attributes.url}
                                                alt=""/></div>
                                        </div>
                                    </div>

                                    <div className='bottom'>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[3].attributes.url}
                                            alt=""/>
                                        </div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[4].attributes.url}
                                            alt=""/>
                                        </div>
                                    </div>
                                    {!(burgerMenu || showFilter) && <InfoBlock item={item}/>}
                                </NavLink>
                            </div>
                        )
                    } else if (i % 8 === 1 || i % 8 === 5) {
                        return (
                            <div key={item.id} className='right-block '>
                                <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
                                    <div className='top'>
                                        <div className='adaptive'>
                                            <img src={baseUrl + item.attributes.images.data[0].attributes.url}
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className='bottom'>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[1].attributes.url}
                                            alt=""/></div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[2].attributes.url}
                                            alt=""/></div>
                                    </div>
                                    {!(burgerMenu || showFilter) && <InfoBlock item={item}/>}

                                </NavLink>
                            </div>
                        )
                    } else if (i % 8 === 2) {
                        return (
                            <div key={item.id} className='left-item'>
                                <NavLink className='img-wrapper' to={`/moreInfo/${photos?.[2].id}`}>
                                    <div className='top'>
                                        <div className='adaptive small'>
                                            <img src={baseUrl + item.attributes.images.data[0].attributes.url}
                                                 alt=""/>
                                        </div>
                                        <div className='adaptive'>
                                            <img src={baseUrl + item.attributes.images.data[1].attributes.url}
                                                 alt=""/>
                                        </div>
                                    </div>
                                    <div className='bottom'>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[2].attributes.url} alt=""/>
                                        </div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[3].attributes.url} alt=""/>
                                        </div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[4].attributes.url} alt=""/>
                                        </div>
                                    </div>
                                    {!(burgerMenu || showFilter) && <InfoBlock item={item}/>}

                                </NavLink>
                            </div>
                        )
                    } else if (i % 8 === 3) {
                        return (
                            <div key={item.id} className='right-block '>
                                <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
                                    <div className='top'>
                                        <div>
                                            <div className='adaptive'><img
                                                src={baseUrl + photos?.[3].attributes.images.data[1].attributes.url}
                                                alt=""/>
                                            </div>
                                            <div className='adaptive'><img
                                                src={baseUrl + photos?.[3].attributes.images.data[2].attributes.url}
                                                alt=""/>
                                            </div>
                                        </div>
                                        <div className='adaptive'>
                                            <img src={baseUrl + item.attributes.images.data[0].attributes.url} alt=""/>
                                        </div>

                                    </div>
                                    <div className='bottom'>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[3].attributes.url} alt=""/></div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[4].attributes.url} alt=""/></div>
                                    </div>
                                    {!(burgerMenu || showFilter) && <InfoBlock item={item}/>}

                                </NavLink>
                            </div>
                        )
                    } else if (i % 8 === 4) {
                        return (
                            <div key={item.id} className='left-block'>
                                <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
                                    <div className='top'>
                                        <div className='adaptive'>
                                            <img src={baseUrl + item.attributes.images.data[0].attributes.url} alt=""/>
                                        </div>
                                        <div className='adaptive small'>
                                            <img src={baseUrl + item.attributes.images.data[1].attributes.url} alt=""/>
                                        </div>
                                    </div>
                                    <div className='bottom'>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[2].attributes.url} alt=""/></div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[3].attributes.url} alt=""/></div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[4].attributes.url} alt=""/></div>
                                    </div>
                                    {!(burgerMenu || showFilter) && <InfoBlock item={item}/>}

                                </NavLink>
                            </div>
                        )
                    } else if (i % 8 === 6) {
                        return (
                            <div key={item.id} className='left-block '>
                                <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
                                    <div className='top'>
                                        <div className='adaptive small'>
                                            <img src={baseUrl + item.attributes.images.data[0].attributes.url} alt=""/>
                                        </div>
                                        <div className='adaptive'>
                                            <img src={baseUrl + item.attributes.images.data[1].attributes.url} alt=""/>
                                        </div>
                                    </div>
                                    <div className='bottom'>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[2].attributes.url} alt=""/></div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[3].attributes.url} alt=""/></div>
                                        <div className='adaptive-small'><img
                                            src={baseUrl + item.attributes.images.data[4].attributes.url} alt=""/></div>
                                    </div>
                                    {!(burgerMenu || showFilter) && <InfoBlock item={item}/>}


                                </NavLink>
                            </div>)
                    }
                })}
            </div>
        </>
    );
};

interface InfoBlockProps {
    item: IPhoto
}

const InfoBlock = ({item}: InfoBlockProps) => {
    return (
        <div className='block_info'>
            <div className='block_info-square'>
                {item.attributes.place_type}, {item.attributes.area} m²
            </div>
            <div className='block_info-title'>
                {item.attributes.place_style}
            </div>
            <div className='block_info-country'>
                {item.attributes.city}, {item.attributes.country}
            </div>
        </div>
    )
}
export default Home;