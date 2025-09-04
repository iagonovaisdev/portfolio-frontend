/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { PrivateApi } from '../../api/privateApi';

export default function authContextProvider(props) {

    const location = new URLSearchParams(window.location);
    const actualPath = location.get('pathname');
    const ignoreList = ['/login'];

    const authSession = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')):null;
    const [auth,setAuth] = useState(authSession);
    const [show,setShow] = useState(false);

    const handleSetAuth = (authData) => {
        localStorage.setItem("auth",authData);
        setAuth(authData);
    };

    const logout = ()=> {
        setAuth({});
        localStorage.setItem('auth','');
        if(actualPath!='/login'){
            window.location="/login?msg=error";
        }
    };

    const checkAuth = () => {
        let authSend = (auth && auth.token) ? auth.token:null;
        if(ignoreList.includes(actualPath)) {
            setShow(true);
        } else {
            PrivateApi.post('/user/checkauth',null,{
                headers: {
                    'authorization': authSend
                }
            })
            .then(()=>{
                auth.authenticated = true;
                setShow(true);
            })
            .catch(()=>{
                setShow(false);
                logout();
            });
        }
    }

    useEffect(()=>{
        checkAuth();
    },[]);

    return(
        <AuthContext.Provider value={{auth,handleSetAuth,logout}}>
            {show && props.children}
        </AuthContext.Provider>
    );

}