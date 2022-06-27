import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

import './index.scss'
import InteriorDesign from "../interiorDesign";
import Architecture from "../architecture";
import Repair from "../repair";
import Navigation from "../../components/Navigation/Navigation";

const baseUrl = 'http://localhost:1337'


const ServicesPrices = () => {
    const dispatch = useAppDispatch()
    const [activeTab, setActiveTab] = useState('tab1')
    useEffect(() => {
    }, [])
    return (
        <>
            <Navigation/>
            {/*{isLoading && 'Loading...'}*/}
            <div className="Tabs">
                {/* Tab nav */}
                <ul className="nav">
                    <li onClick={() => setActiveTab && setActiveTab('tab1')}>Дизайн интерьера</li>
                    <li onClick={() => setActiveTab && setActiveTab('tab2')}>Архитектура, ланшафтный дизайн</li>
                    <li onClick={() => setActiveTab && setActiveTab('tab3')}>Ремонт</li>
                </ul>
                <div className="outlet">
                    {activeTab === "tab1" ? <InteriorDesign/> : activeTab === "tab2" ? <Architecture/> : <Repair/>}
                </div>
            </div>


        </>
    );
};

export default ServicesPrices

