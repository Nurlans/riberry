import React from 'react';
import {IImages} from "../../models/IImage";
import './BigMiddleThree.scss'

interface BigMiddleThreeProps {
    images: IImages
}

const baseUrl = 'http://localhost:1337'
const BigMiddleThree = ({images}: BigMiddleThreeProps) => {
    return (
        <div className='big-top-three'>
            <div className='bottom-block__top'>
                <img src={baseUrl + images.data[0]?.attributes.url} alt=""/></div>
            <div className='bottom-block'>
                <div className='bottom-block__item'><img src={baseUrl + images.data[1]?.attributes.url} alt=""/></div>
                <div className='bottom-block__item'><img src={baseUrl + images.data[2]?.attributes.url} alt=""/></div>
                <div className='bottom-block__item'><img src={baseUrl + images.data[3]?.attributes.url} alt=""/></div>
            </div>
        </div>
    );
};

export default BigMiddleThree;