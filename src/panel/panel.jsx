import { useContext } from 'react';
import { Outlet, Routes } from 'react-router-dom';

import './styles/style.scss';

import AppContextProvider from '../context/AppContext/AppContextProvider';
import AuthContextProvider from './context/authContext/authContextProvider';

import { AppContext } from '../context/AppContext/AppContext';

export default function PanelRouter() {

    const { translation } = useContext(AppContext);

    return(
        <>  
            <AppContextProvider>
                <AuthContextProvider>
                    <Outlet/>
                </AuthContextProvider>
            </AppContextProvider>
        </>
    );

};