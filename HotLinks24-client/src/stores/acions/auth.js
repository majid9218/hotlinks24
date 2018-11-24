import {SET_CURRENT_USER} from '../action-types';
import {apiCall, setTokenHeader} from '../../services/api';
import {addError, removeError} from './error'

export  const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    user
});

export const setAuthorizationToken = (token) => {
    setTokenHeader(token);
}

export const logOut = () => {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export const authUser = (type, userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData).then(({token, ...user}) => {
                localStorage.setItem('jwToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                localStorage.setItem('pImg', user.profileImageUrl);
                dispatch(removeError());
                resolve();
            }).catch(err => {
                dispatch(addError(err));
                reject();
            });
        });
    }
}

export const editUser = (id, userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('put', `/api/users/${id}/edit`, userData).then(({token, ...user}) => {
                localStorage.setItem('jwToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                localStorage.setItem('pImg', user.profileImageUrl);
                dispatch(removeError());
                resolve();
            }).catch(err => {
                dispatch(addError(err));
                reject();
            });
        });
    }
}