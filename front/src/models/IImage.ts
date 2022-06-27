export interface IImages {
    data: IImage[]
}

export interface IImage {
    id: number | null,
    attributes: {
        "name": string,
        "width": number,
        "height": number,
        "url": string,
    }
}
