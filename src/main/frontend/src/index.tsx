import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globalStyles.css';
import './styles/commonStyles.css';
import {HelmetProvider} from "react-helmet-async";
import GlobalHelmet from "./components/GlobalHelmet";
import {RecoilRoot} from "recoil";
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "react-query";
import instanceQueryClient from "./utils/InstanceQueryClient";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HelmetProvider>
        <GlobalHelmet/>
        <RecoilRoot>
            <BrowserRouter>
                <QueryClientProvider client={instanceQueryClient}>
                    <App/>
                </QueryClientProvider>
            </BrowserRouter>
        </RecoilRoot>
    </HelmetProvider>
);
