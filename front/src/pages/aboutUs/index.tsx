import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchInfoAboutUs} from "../../store/reducers/ActionCreators";
import BigMiddleThree from "../../components/BlockForm/BigMiddleThree";
import './index.scss'
import ReactMarkdown from 'react-markdown'
import Navigation from "../../components/Navigation/Navigation";

const baseUrl = 'http://localhost:1337'

const AboutUs = () => {
    const dispatch = useAppDispatch()
    const {info, isLoading} = useAppSelector(state => state.aboutUsReducer)
    useEffect(() => {
        dispatch(fetchInfoAboutUs())
    }, [])
    return (
        <>
            <Navigation/>
            {isLoading && 'Loading...'}
            <div className='about-us'>
                <div className='about-us-top__body'>
                    <div className='about-us-top__body-left'>
                        <h1 className='about-us-top__body-title'>{info.attributes.title.split('\n')}</h1>
                        <ReactMarkdown>
                            {info.attributes.description}
                        </ReactMarkdown>
                    </div>
                    <BigMiddleThree images={info.attributes.images}/>
                </div>
                <div className='about-us-bottom__body'>
                    <div className='about-us-bottom__body-left'>
                        <img src={baseUrl + info.attributes.personPhoto.data[0].attributes.url} alt=""/>
                    </div>
                    <div className='about-us-bottom__body-right'>
                        <h2>{info.attributes.title2}</h2>
                        <h1 className='about-us-bottom__body__name'>{info.attributes.name}</h1>
                        <ReactMarkdown>
                            {info.attributes.personInfo}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AboutUs;