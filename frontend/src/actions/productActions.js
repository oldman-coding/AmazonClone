import axios from "axios";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/productConstants"; 

export const listProducts = ({seller=''}) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try {
        const {data} = await axios.get(`/api/products?seller=${seller}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message}); 
    }
}

export const detailsProduct =(productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, 
        payload: productId
    })
    try {
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message, 
                    }); 
    }
}; 

export const createProduct = () => async (dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST})
    try {
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.post('/api/products', {}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }); 
        dispatch({
            type: PRODUCT_CREATE_SUCCESS, 
            payload: data.product
        }); 

    } catch (error) {
        const message = error.response && error.response.data.message 
        ? error.response.data.message
        : error.message; 
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message
        }) 
    }
}

export const editProduct = (product) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_EDIT_REQUEST, 
        payload: product
    }); 
    console.log(product);
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await axios.put(`/api/products/${product.productId}`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }); 
        dispatch({
            type: PRODUCT_EDIT_SUCCESS, 
            payload: data
        }); 
    }
    catch (error) {
        const message = error.response && error.response.data.message 
        ? error.response.data.message
        : error.message; 
        dispatch({
            type: PRODUCT_EDIT_FAIL, 
            payload: message 
        }); 
    }
}; 

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_DELETE_REQUEST, 
        payload: productId
    }); 
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }); 
        dispatch({
            type: PRODUCT_DELETE_SUCCESS, 
            payload: data
        }); 
    }
    catch (error) {
        const message = error.response && error.response.data.message 
        ? error.response.data.message
        : error.message; 
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload: message 
        }); 
    }
}; 

