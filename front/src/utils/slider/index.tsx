import React from 'react';
import Slider from "react-slick";
import './index.scss'

const baseUrl = 'http://localhost:1337'

const SliderComponent = ({sliderItems}: any) => {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
    };
    return (
        <Slider {...settings}>
            {sliderItems.map((item: string) => (
                <img src={baseUrl + item} alt=""/>
            ))}
        </Slider>
    );
};

export default SliderComponent;