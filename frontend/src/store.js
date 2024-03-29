import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productEditReducer, productListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk'; 
import logger from 'redux-logger';
import { cartReducer } from './reducers/cartReducer';
import { userDeleteReducer, userDetailReducer, userListReducer, userRegisterReducer, userSigninReducer, userTopSellersReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducer';

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
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {}, 
        paymentMethod: 'PayPal'
    }
};

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer, 
    cart: cartReducer, 
    userSignin: userSigninReducer, 
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer, 
    orderDetails: orderDetailsReducer, 
    orderPay: orderPayReducer, 
    orderMineList: orderMineListReducer, 
    userDetail : userDetailReducer, 
    userUpdateProfile: userUpdateProfileReducer, 
    productCreate: productCreateReducer, 
    productEdit: productEditReducer, 
    productDelete: productDeleteReducer, 
    orderList: orderListReducer, 
    orderDelete: orderDeleteReducer, 
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer, 
    userUpdate: userUpdateReducer, 
    userTopSellers: userTopSellersReducer, 
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk, logger))); 

export default store;