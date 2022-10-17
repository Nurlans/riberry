import {IImage, IImages} from "./IImage";

export interface IBlogs {
    id: number | null,
    attributes: {
        blog_date: string,
        blog_title: string,
        blog_description: string,
        blog_Img: {
            data: IImage
        }
    }
}

