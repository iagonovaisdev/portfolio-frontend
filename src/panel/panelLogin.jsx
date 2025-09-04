import './styles/style.scss';

import AppContextProvider from '../context/AppContext/AppContextProvider';
import AuthContextProvider from './context/authContext/authContextProvider';
import PanelLoginComponent from './components/templates/panelLoginComponent';

export default function PanelLogin() {

    return(
        <>  
            <AppContextProvider>
                <AuthContextProvider>
                    <PanelLoginComponent/>
                </AuthContextProvider>
            </AppContextProvider>
        </>
    );

};