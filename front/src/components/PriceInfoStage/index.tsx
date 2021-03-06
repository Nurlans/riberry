import React from 'react';
import './index.scss'
import {IStage} from "../../models/IStages";
import ReactMarkdown from 'react-markdown'

const baseUrl = 'http://localhost:1337'

interface PriceInfoStageProps {
    stage: IStage
}

const PriceInfoStage = ({stage}: PriceInfoStageProps) => {
    return (
        <div className='stage'>
            <div className='stage-number'>
                <div>
                    Этап {stage.attributes.stage}
                </div>
            </div>
            <div className='stage-body'>
                <div className='stage-body__left'>
                    <div className='stage-title'>
                        {stage.attributes.stage_title}
                    </div>
                    <ReactMarkdown>
                        {stage.attributes.stage_description}
                    </ReactMarkdown>
                </div>
                <div>
                    <img src={baseUrl + stage.attributes.stage_image.data[0].attributes.url} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default PriceInfoStage;