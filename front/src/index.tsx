import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {BrowserRouter, NavLink} from "react-router-dom";
import {IBlogs} from "./models/Blogs";

const store = setupStore()
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
);

