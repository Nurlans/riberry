import React from 'react';
import './index.scss'

const azn = require('../../assets/azn.svg').default

interface PriceInfoBlockProps {
    title: string,
    price: number,
    moreInfo?: boolean,
    to100?: string,
    from100to200?: string,
    from200?: string
}

const PriceInfoBlock = ({title, price, moreInfo = true, to100, from100to200, from200}: PriceInfoBlockProps) => {
    return (
        <div className='price-info-main'>
            <div className='price-info'>
                <div className='price-info__title'>
                    {title}
                </div>
                <div className='price-info__price'>
                    {price}
                    <img src={azn} alt=""/>
                </div>
            </div>
            {moreInfo &&
                <div className='more-info'>
                    <div className='more-info-item'>
                        <div className='more-info__square'>До 100 м²</div>
                        {
                            to100 && <div className='price-info__price'>
                                {to100}
                                <img src={azn} alt=""/>
                            </div>
                        }
                    </div>
                    <div className='more-info-item'>
                        <div className='more-info__square'>100-200 м²</div>
                        {from100to200 &&
                            <div className='price-info__price'>
                                {from100to200}
                                <img src={azn} alt=""/>
                            </div>}
                    </div>
                    <div className='more-info-item'>
                        <div className='more-info__square'>200 м²</div>
                        {
                            from200 && <div className='price-info__price'>
                                {from200}
                            </div>
                        }
                    </div>
                </div>}

        </div>

    );
};

export default PriceInfoBlock;
