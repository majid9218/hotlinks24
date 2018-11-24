import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers';




const configureStore = () => {
    const store = createStore(mainReducer, compose(
        applyMiddleware(thunk)
    ));
    return store;
}

export default configureStore;

