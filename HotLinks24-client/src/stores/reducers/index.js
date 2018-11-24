import {combineReducers} from 'redux';
import errorReducer from './error-reducer';
import currentUser from './current-user';
import hotLinkReducer from './hotlink-reducer';

const mainReducer = combineReducers({
    hotLinkReducer,
    errorReducer,
    currentUser
});

export default mainReducer;