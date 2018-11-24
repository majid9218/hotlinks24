import {ADD_HOTLINK, REMOVE_HOTLINK, RESET_HOTLINKS} from '../action-types';

export default (state=[], action) => {
    switch(action.type){
        case ADD_HOTLINK:
            return [...state, ...action.hotlinks];
        case REMOVE_HOTLINK:
            return state.filter(hotlink => hotlink._id !== action.id);
        case RESET_HOTLINKS:
            return [];
        default:
            return state;
    }
}