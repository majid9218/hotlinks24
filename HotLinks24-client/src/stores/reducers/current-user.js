import {SET_CURRENT_USER} from '../action-types';

const defaultState = {
    isAuthenticated: false,
    user: {}
}

export default (state = defaultState, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user
            };
        default: 
            return state;
    }
}