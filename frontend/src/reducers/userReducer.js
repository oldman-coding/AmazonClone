import { USER_DETAIL_FAIL, USER_UPDATE_PROFILE_RESET, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAIL_RESET, USER_TOP_SELLERS_REQUEST, USER_TOP_SELLERS_FAIL, USER_TOP_SELLERS_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST: 
            return {loading: true}
        case USER_SIGNIN_SUCCESS: 
            return {loading: false, userInfo: action.payload}
        case USER_SIGNIN_FAIL: 
            return {loading: false, error: action.payload}
        case USER_SIGNOUT: 
            return {};
        default: 
            return state; 
    }
}; 

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST: 
            return {loading: true}
        case USER_REGISTER_SUCCESS: 
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL: 
            return {loading: false, error: action.payload}
        default: 
            return state; 
    }
}; 

export const userDetailReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case USER_DETAIL_REQUEST: 
            return {loading: true}
        case USER_DETAIL_SUCCESS: 
            return {loading: false, user: action.payload}
        case USER_DETAIL_FAIL:  
            return {loading: false, error: action.payload}
        case USER_DETAIL_RESET: 
            return {}
        default: 
            return state; 
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST: 
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS: 
            return {loading: false, success: true}
        case USER_UPDATE_PROFILE_FAIL:  
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET: 
            return {}
        default: 
            return state; 
    }
}

export const userListReducer = (state = {loading:true}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST: 
            return {loading: true}
        case USER_LIST_SUCCESS: 
            return {loading: false, users: action.payload}
        case USER_LIST_FAIL:  
            return {loading: false, error: action.payload};
        default: 
            return state; 
    }
}; 

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST: 
            return {loading: true}
        case USER_DELETE_SUCCESS: 
            return {loading: false, success: true}
        case USER_DELETE_FAIL:  
            return {loading: false, error: action.payload};
        case USER_DELETE_RESET: 
            return {}
        default: 
            return state; 
    }
}


export const userUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST: 
            return {loading: true}
        case USER_UPDATE_SUCCESS: 
            return {loading: false, success: true}
        case USER_UPDATE_FAIL:  
            return {loading: false, error: action.payload};
        case USER_UPDATE_RESET: 
            return {}
        default: 
            return state; 
    }
}

export const userTopSellersReducer = (state = {loading:true}, action) => {
    switch(action.type) {
        case USER_TOP_SELLERS_REQUEST: 
            return {loading: true}
        case USER_TOP_SELLERS_SUCCESS: 
            return {loading: false, users: action.payload}
        case USER_TOP_SELLERS_FAIL:  
            return {loading: false, error: action.payload};
        default: 
            return state; 
    }
}; 