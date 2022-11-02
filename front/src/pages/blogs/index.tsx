import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchBlogs } from '../../store/reducers/ActionCreators'
import './index.scss'
import Navigation from '../../components/Navigation/Navigation'
import { NavLink } from 'react-router-dom'

const baseUrl = 'http://localhost:1337'

const Blogs = () => {
	const dispatch = useAppDispatch()
	const { burgerMenu } = useAppSelector(state => state.burgerMenuReducer)

	const { blogs, error, isLoading } = useAppSelector(
		state => state.blogsReducer
	)
	useEffect(() => {
		dispatch(fetchBlogs())
	}, [])
	return (
		<>
			<Navigation />
			{isLoading ? (
				<>Loading...</>
			) : (
				!burgerMenu && (
					<div className='blogs'>
						{blogs.map(blog => (
							<NavLink to={`${blog.id}`} className='blog' key={blog.id}>
								<img
									className='blog-image'
									src={baseUrl + blog.attributes.blog_Img.data.attributes.url}
									alt=''
								/>
								<p className='blog-date'>{blog.attributes.blog_date} </p>
								<p className='blog-title'>{blog.attributes.blog_title} </p>
							</NavLink>
						))}
					</div>
				)
			)}
		</>
	)
}

export default Blogs
