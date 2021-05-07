import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'; 
import logger from 'redux-logger';
import { cartReducer } from './reducers/cartReducer';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo')) 
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [], 
    }
};

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer, 
    cart: cartReducer, 
    userSignin: userSigninReducer, 
    userRegister: userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk, logger))); 

export default store;