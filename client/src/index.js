import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from "./store/auth-context";
import AxiosMiddleware from "./middleware/axiosMiddleware";

ReactDOM.render(
    <BrowserRouter>
        <AuthContextProvider>
            <AxiosMiddleware>
                <App/>
            </AxiosMiddleware>
        </AuthContextProvider>,
    </BrowserRouter>,
    document.getElementById('root')
);
