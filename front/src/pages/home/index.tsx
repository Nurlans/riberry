import React, {useEffect, useRef, useState} from 'react';
import {IPhoto} from "../../models/IPhoto";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    clearPhotoState,
    fetchPhotos,
    fetchPhotosByFilter, photosByPagination,
} from "../../store/reducers/ActionCreators";
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
    const {photos, error, pageCount, isLoading, selectedNavPage} = useAppSelector(state => state.photoReducer)
    const {burgerMenu, showFilter} = useAppSelector(state => state.burgerMenuReducer)
    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(false)
    const lastElement: any = useRef()
    const observer: any = useRef()
    console.log(photos);
    useEffect(() => {
        console.log('paginationUse')
        if (page === 1 && photos.length > 1){
            dispatch(clearPhotoState())
            dispatch(photosByPagination(selectedType, selectedStyle, selectedNavPage, page))
        }else{
            dispatch(photosByPagination(selectedType, selectedStyle, selectedNavPage, page))

        }
    }, [page,selectedStyle, selectedType])

    useEffect(() => {
        console.log('nav')

        setPage(1)
        if (selectedType.length > 0) {
            setSelectedType([])
        }
        if (selectedStyle.length > 0) {
            setSelectedStyle([])
        }
        setShowAllTypeFilters(false)
        setShowAllStyleFilters(false)
        dispatch(fetchPhotosByFilter(selectedType, selectedStyle, selectedNavPage, page))
        return function () {
            dispatch(clearPhotoState())
        }
    }, [selectedNavPage])

    // useEffect(() => {
    //     console.log('filterUse')
    //     dispatch(fetchPhotosByFilter(selectedType, selectedStyle, selectedNavPage, page))
    // }, [selectedStyle, selectedType])

    useEffect(() => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        const callback = function (entries: any, observer: any) {
            if (entries[0].isIntersecting && page < pageCount) {
                setPage(page + 1)
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current)
    }, [isLoading])
    const map = Array.from(new Set(photos))
    return (
        <>
            <Navigation setPage={setPage} selectedType={selectedType} setSelectedType={setSelectedType}
                        selectedStyle={selectedStyle}
                        setSelectedStyle={setSelectedStyle}
                        showAllStyleFilters={showAllStyleFilters} showAllTypeFilters={showAllTypeFilters}
                        setShowAllStyleFilters={setShowAllStyleFilters}
                        setShowAllTypeFilters={setShowAllTypeFilters}/>
            {isLoading && "Loading"}
            <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                <div className='main-block grid-wrapper'>
                    {photos && photos.map((item: IPhoto, i: number) => {
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
                                                <img src={baseUrl + item.attributes.images.data[0].attributes.url}
                                                     alt=""/>
                                            </div>

                                        </div>
                                        <div className='bottom'>
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
                        } else if (i % 8 === 4) {
                            return (
                                <div key={item.id} className='left-block'>
                                    <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
                                        <div className='top'>
                                            <div className='adaptive'>
                                                <img src={baseUrl + item.attributes.images.data[0].attributes.url}
                                                     alt=""/>
                                            </div>
                                            <div className='adaptive small'>
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
                        } else if (i % 8 === 6) {
                            return (
                                <div key={item.id} className='left-block '>
                                    <NavLink className='img-wrapper' to={`/moreInfo/${item.id}`}>
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
                                </div>)
                        }
                    })}
                </div>
                <div ref={lastElement} style={{height: '1px'}}>1111</div>
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