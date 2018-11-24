import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from '../components/navbar';
import Main from './main';


const AppRouter = () => (
    <BrowserRouter>
        <div className='on-boarding'>
            <Navbar />
            <Main />
        </div>
    </BrowserRouter>
);

export default AppRouter;