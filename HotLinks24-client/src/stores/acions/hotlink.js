import {ADD_HOTLINK, REMOVE_HOTLINK, RESET_HOTLINKS} from '../action-types';
import {apiCall} from '../../services/api';
import {addError} from './error';

export const addHotLinks = (hotlinks) => ({
    type: ADD_HOTLINK,
    hotlinks
});

export const removeHotLink = (id) => ({
    type: REMOVE_HOTLINK,
    id
});

export const resetHotLinks = () => ({
    type: RESET_HOTLINKS
});

export const deleteHotLink = (userId, HotLinkId) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${userId}/hotlinks/${HotLinkId}`)
        .then(() => {dispatch(removeHotLink(HotLinkId))})
        .catch(err => {dispatch(addError(err.message))});
    }
}

export const fetchHotLinks = (page) => {
    return dispatch => {
        return apiCall('get', `/api/hotlinks?page=${page}`).then(hotlinks => {
            if(hotlinks.length < 1){
                dispatch(addError('No more links to show!'));
            }
            dispatch(addHotLinks(hotlinks));
        }).catch(err => {
            dispatch(addError(err.message));
        })
    }
}

export const addNewHotLink = (text, link) => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('post', `/api/users/${id}/hotlinks`, {text, link}).then(
            res => {}
        ).catch(
            err => {
                dispatch(addError(err.message));
            }
        )
    }
}