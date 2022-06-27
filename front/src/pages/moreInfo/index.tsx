import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchPhotoById} from "../../store/reducers/ActionCreators";
import './index.scss'
import ReactMarkdown from "react-markdown";
import ImageGallery from 'react-image-gallery';


const MoreInfo = () => {

    const dispatch = useAppDispatch()
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
            <div>
                <ImageGallery showPlayButton={false} autoPlay={false} showFullscreenButton={false} items={images}/>

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