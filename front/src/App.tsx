import React from 'react';
import './App.scss';
import Home from './pages/home/index'
import Header from "./components/Header/Header";
import {Routes, Route, Link} from "react-router-dom";
import AboutUs from "./pages/aboutUs";
import ServicesPrices from "./pages/servicesPricesTabs";
import Blogs from "./pages/blogs";
import Footer from "./components/Footer";
import MoreInfo from "./pages/moreInfo";
import './i18n'
import Contacts from "./pages/contacts";
import Blog from "./pages/blog";

function App() {

    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/public" element={<Home/>}/>
                    <Route path="/landscape" element={<Home/>}/>
                    <Route path="/realization" element={<Home/>}/>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/services-prices" element={<ServicesPrices/>}/>
                    <Route path="/blogs" element={<Blogs/>}/>
                    <Route path="/blogs/:id" element={<Blog/>}/>
                    <Route path="/moreInfo/:id" element={<MoreInfo/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                </Routes>
            </div>

            <Footer/>
        </>
    );
}

export default App;
