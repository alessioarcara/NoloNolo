import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from "./store/auth-context";
import {BreakpointContextProvider} from "./store/breakpoint-context";
import AxiosMiddleware from "./middleware/axiosMiddleware";

ReactDOM.render(
    <BrowserRouter>
        <BreakpointContextProvider>
            <AuthContextProvider>
                <AxiosMiddleware>
                    <App/>
                </AxiosMiddleware>
            </AuthContextProvider>
        </BreakpointContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
