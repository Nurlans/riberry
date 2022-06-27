import React, {useEffect} from 'react';
import PriceInfoBlock from "../../components/PriceInfoBlock";
import {IStage} from "../../models/IStages";
import PriceInfoStage from "../../components/PriceInfoStage";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchServicePricesStages} from "../../store/reducers/ActionCreators";

const priceBlocks = [
    {id: 1, title: 'Планировочное  (1 м²)', price: 12, moreInfo: false},
    {id: 2, title: '3D Визуализация  (1 м²)', price: 18, moreInfo: false},
    {id: 3, title: 'Полный дизайн-проект  (1 м²)', price: 35, moreInfo: false},
    {id: 4, title: 'Ландшафтный дизайн (100 м²)', price: 150, moreInfo: false},
]


const Architecture = () => {
    const {stages, error, isLoading} = useAppSelector(state => state.stageReducer)
    return (

        <div>
            <div className='price-info-wrapper'>
                {priceBlocks.map(priceItem => (
                    <PriceInfoBlock key={priceItem.id} title={priceItem.title} price={priceItem.price}
                                    moreInfo={priceItem.moreInfo}/>
                ))}
            </div>
            <div className='stages-wrapper'>
                {
                    stages.map((stage: IStage) => (
                        <PriceInfoStage key={stage.id} stage={stage}/>

                    ))
                }

            </div>
        </div>
    );
};

export default Architecture;