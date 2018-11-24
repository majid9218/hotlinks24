import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/appRouter';
import configureStore from './stores'
import {setAuthorizationToken, setCurrentUser} from './stores/acions/auth';
import jwtDecode from 'jwt-decode';
import 'normalize.css/normalize.css';
import './styles/index.scss';

const store = configureStore();

if(localStorage.jwToken){
    setAuthorizationToken(localStorage.jwToken);
    try{
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwToken)));
    } 
    catch(e){
        store.dispatch(setCurrentUser({}));
    }
}



const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));