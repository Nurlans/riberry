import React, {useEffect} from 'react';
import Navigation from "../../components/Navigation/Navigation";
import ReactMarkdown from "react-markdown";
import {fetchBlog, fetchInfoAboutUs} from "../../store/reducers/ActionCreators";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {NavLink, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import './index.scss'
import {IBlogs} from "../../models/Blogs";

const arrowBack = require('../../assets/Vector.svg').default
const baseUrl = 'http://localhost:1337'

const Blog = () => {
    const {t} = useTranslation();
    const params = useParams();
    const dispatch = useAppDispatch()
    const {blog} = useAppSelector(state => state.blogReducer)
    const {blogs} = useAppSelector(state => state.blogsReducer)


    useEffect(() => {
        dispatch(fetchBlog(params.id))
    }, [params.id])

    return (
        <>
            <Navigation/>
            <div className='one-blog'>
                <div className='top-panel'>
                    <div className='back__btn'>
                        <img src={arrowBack} alt=""/>
                        <NavLink to={'/blogs'}>{t('Back')}</NavLink>
                    </div>
                </div>
                <div className='one-blog__item'>
                    <img className='leftImg' src={baseUrl + blog.attributes?.blog_Img.data.attributes.url} alt=""/>
                    <div className='one-blog__description'>
                        <div className='one-blog__date'>{blog.attributes.blog_date}</div>
                        <h2 className='one-blog__title'>{blog.attributes.blog_title}</h2>
                        <ReactMarkdown>
                            {blog.attributes.blog_description}
                        </ReactMarkdown>
                    </div>

                </div>
                <div className='another-blogs'>
                    <h3 className='another-blogs__title'>Другие блоги</h3>
                    <div className='another-blogs__item'>
                        {blogs.slice(0, 3).map(blog => (
                            <NavLink className='another-blogs__main' to={`/blogs/${blog.id}`} key={blog.id}>
                                <img className='blog-image' src={baseUrl + blog.attributes.blog_Img.data.attributes.url}
                                     alt=""/>
                                <p className='blog-date'>{blog.attributes.blog_date}  </p>
                                <p className='blog-title'>{blog.attributes.blog_title}  </p>
                            </NavLink>)
                        )}
                    </div>

                </div>
            </div>

        </>
    );
};

interface BlogComponentProps {
    item: IBlogs
}

const BlogComponent = ({item}: BlogComponentProps) => {
    return (
        <NavLink to={`${item.id}`} className='blog' key={item.id}>
            <img className='blog-image' src={baseUrl + item.attributes.blog_Img.data.attributes.url}
                 alt=""/>
            <p className='blog-date'>{item.attributes.blog_date}  </p>
            <p className='blog-title'>{item.attributes.blog_title}  </p>
        </NavLink>
    )
}
export default Blog;