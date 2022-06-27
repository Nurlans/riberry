import {combineReducers, configureStore} from "@reduxjs/toolkit";
import photoReducer from './reducers/photoSlice'
import photoByIdReducer from './reducers/PhotoByIdSlice'
import aboutUsReducer from '../store/reducers/AboutUsSlice'
import stageReducer from '../store/reducers/ServicePricesSlice'
import blogsReducer from '../store/reducers/BlogsSlice'
import blogReducer from '../store/reducers/BlogSlice'
import burgerMenuReducer from '../store/reducers/BurgerMenuSlice'


const rootReducer = combineReducers({
    photoByIdReducer, blogReducer, burgerMenuReducer, photoReducer, aboutUsReducer, stageReducer, blogsReducer
})

export const setupStore = () => {
    return configureStore({reducer: rootReducer})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']