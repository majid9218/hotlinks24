import {ADD_ERROR, REMOVE_ERROR} from '../action-types';

export const addError = (error) => ({
    type: ADD_ERROR,
    error
}); 

export const removeError = () => ({
    type: REMOVE_ERROR
}); 

export const onError = (err) => {
    return dispatch => {
        dispatch(addError(err));
    }
}