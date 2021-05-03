import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'; 
import logger from 'redux-logger';

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk, logger))); 

export default store;