import {IImage, IImages} from "./IImage";

export interface IAboutUsResponse {
    data: [{
        id: number | null,
        attributes: {
            title: string,
            description: string,
            title2: string,
            name: string,
            text: string,
            images: {
                data: [
                    {
                        "id": number | null,
                        "attributes": {
                            name: string,
                            width: number,
                            height: number,
                            "url": string,
                        }
                    }]
            }
        }
    }]

}

export interface IAboutUs {
    id: number | null,
    attributes: {
        title: string,
        description: string,
        title2: string,
        name: string,
        text: string,
        personPhoto: IImages
        personInfo: string,
        images: IImages
    }
}

