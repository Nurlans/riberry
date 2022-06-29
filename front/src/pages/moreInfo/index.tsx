import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchPhotoById} from "../../store/reducers/ActionCreators";
import './index.scss'
import ReactMarkdown from "react-markdown";
import ImageGallery from 'react-image-gallery';
import {useTranslation} from "react-i18next";

const arrowLeft = require('../../assets/arrow-left.svg').default

const MoreInfo = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const [readMore,setReadMore]=useState(false)
    const {photosById, error, isLoading} = useAppSelector(state => state.photoByIdReducer)
    const params = useParams();
    const carouselPhotos = photosById?.attributes?.images?.data || []
    const images = [...carouselPhotos?.map((photo) => ({
        original: 'http://localhost:1337' + photo.attributes.url,
        thumbnail: 'http://localhost:1337' + photo.attributes.url
    }))]
    useEffect(() => {
        dispatch(fetchPhotoById(params.id))
    }, [])
    return (
        <div className='about-repair__wrapper'>
            <div className='about-repair__mobile'>
                <div className='about-repair__mobile-top'>
                    <NavLink to='/'><img src={arrowLeft} alt=""/></NavLink>
                    <div
                        className='about-repair__mobile-top__title'>{photosById.attributes.place_type}, {photosById.attributes.place_style},{photosById.attributes.area} m²
                    </div>
                </div>
                <div className='about-repair__mobile-top__desc'>
                    {(photosById.attributes.description?.length > 100 && readMore)  ? photosById.attributes.description : photosById.attributes.description?.slice(0, 100) }
                    {!readMore &&  photosById.attributes.description &&  <span onClick={()=>setReadMore(true)} className='about-repair__mobile-top__desc-more' >
                        {t(" Read more")}
                    </span>}
                </div>
            </div>
            <div>
                <ImageGallery showPlayButton={false} autoPlay={false} showFullscreenButton={false} items={images}/>
            </div>
            <div className='about-repair__mobile-photos'>
                {images.map(image => (
                    <img className='about-repair__mobile-photo' src={image.original} alt=""/>
                ))}
            </div>
            <div className='about-repair'>
                <div className='about-repair__title'>
                    {photosById.attributes?.title}, {photosById.attributes?.city}, {photosById.attributes?.area} m²
                </div>

                <div className='about-repair__description'>
                    <ReactMarkdown>
                        {photosById.attributes?.description}
                    </ReactMarkdown>
                </div>
            </div>

        </div>

    );
};

export default MoreInfo;