export interface IStages {
    data: IStage[]
}

export interface IStage {
    id: number | null,
    attributes: {
        stage: string,
        stage_description: string,
        stage_title: string,
        stage_image: {
            data: [{
                id: string,
                attributes: {
                    name: string,
                    width: number,
                    height: number,
                    url: string,
                }
            }]
        }
    }
}