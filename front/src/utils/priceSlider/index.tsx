import React, {Dispatch, SetStateAction} from "react";
import Slider from "react-slick";
import {NavLink} from "react-router-dom";
import {selectNavPage} from "../../store/reducers/ActionCreators";
import {useAppDispatch} from "../../hooks/redux";
import './index.scss'

interface PriceSliderProps {
    items: { id: number; title: string; }[],
    setIsActive: Dispatch<SetStateAction<number>>,
}

const PriceSlider = ({items, setIsActive}: PriceSliderProps) => {
    const dispatch = useAppDispatch()
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 3,
        swipeToSlide: true,
        arrows: false,
        centerMode: true,
        slidesToScroll: 4,
    }

    return (
        <Slider {...settings}>

        </Slider>
    )
}

export default PriceSlider
