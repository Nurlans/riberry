import React, {useEffect} from 'react';
import PriceInfoBlock from "../../components/PriceInfoBlock";
import './index.scss'
import PriceInfoStage from "../../components/PriceInfoStage";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchServicePricesStages} from "../../store/reducers/ActionCreators";
import {IStage} from "../../models/IStages";

const priceBlocks = [
    {id: 1, title: 'Планировочное  (1 м²)', price: 12, moreInfo: false},
    {
        id: 2, title: '3D Визуализация  (1 м²)', price: 27, moreInfo: true,
        to100: '27', from100to200: '18', from200: 'Договор'
    },
    {
        id: 3, title: 'Полный дизайн-проект  (1 м²)',
        price: 35,
        moreInfo: true,
        to100: '35',
        from100to200: '25',
        from200: 'Договор'
    },
]
const InteriorDesign = () => {
    const dispatch = useAppDispatch()
    const {stages, error, isLoading} = useAppSelector(state => state.stageReducer)
    useEffect(() => {
        dispatch(fetchServicePricesStages())
    }, [])
    return (

        <div>
            <div className='price-info-wrapper'>
                {priceBlocks.map(priceItem => (
                    <PriceInfoBlock key={priceItem.id} to100={priceItem.to100} from200={priceItem.from200}
                                    from100to200={priceItem.from100to200} title={priceItem.title}
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

export default InteriorDesign;