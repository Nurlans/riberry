import React, {useEffect} from 'react';
import PriceInfoBlock from "../../components/PriceInfoBlock";
import './index.scss'
import PriceInfoStage from "../../components/PriceInfoStage";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchServicePricesStages} from "../../store/reducers/ActionCreators";
import {IStage} from "../../models/IStages";

const priceBlocks = [
    {id: 1, title: 'Работа и материал  (1 м²)', price: 500, moreInfo: false},
]
const Repair = () => {
    const dispatch = useAppDispatch()
    const {stages, error, isLoading} = useAppSelector(state => state.stageReducer)
    useEffect(() => {
        dispatch(fetchServicePricesStages())
    }, [])
    return (

        <div>
            <div className='price-info-wrapper'>
                {priceBlocks.map(priceItem => (
                    <PriceInfoBlock key={priceItem.id} title={priceItem.title}
                                    price={priceItem.price} moreInfo={priceItem.moreInfo}/>
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

export default Repair;