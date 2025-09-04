import { useContext, useEffect, useState } from 'react';
import md5 from 'md5';

import AppContextProvider from '../../../context/AppContext/AppContextProvider';
import { AuthContext } from '../../context/authContext/authContext';
import AuthContextProvider from '../../context/authContext/authContextProvider';
import { PrivateApi } from '../../api/privateApi';
import ReturnComponent from '../../../components/returnComponent';

export default function PanelLoginComponent() {

    const location = new URLSearchParams(window.location.search);
    const msg = location.get('msg');

    const {auth,handleSetAuth} = useContext(AuthContext);
    const [data,setData] = useState({});
    const [error,setError] = useState({});
    const [loading,setLoading] = useState(false);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handlePassword = (password) => {
        let hash = md5(password);
        setPassword(hash);
    };

    useEffect(()=>{
        if( msg == 'error' ){
            setError(['Make login to continue']);
        };
    },[]);

    const makeLogin = async () => {

        setLoading(true);

        await PrivateApi.post('/user/login',{
            'email' : email,
            'password' : password
        })
        .then((result)=>{
            if(result.data.response.token) {
                let newAuth = {
                    'id':result.data.response.id,
                    'name':result.data.response.name,
                    'email':result.data.response.email,
                    'token':result.data.response.token
                };
                setError([]);
                setLoading(false);
                newAuth = JSON.stringify(newAuth);
                handleSetAuth(newAuth);
                window.location.href= "/panel";
            }
        })
        .catch((error)=>{
            setError(["Invalid credentials"]);
            setLoading(false);
        });

    };

    return(
        <>  
            <AppContextProvider>
                <AuthContextProvider>
                    <div className="login">
                        <div className="bg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className='form'>
                                            <div className="logo">
                                                <div className="logo">
                                                    <span className="name">Iago Novais <strong>_</strong></span>
                                                </div>
                                            </div>
                                            <div className="form-field">
                                                <ReturnComponent type='sucess' list={data}/>
                                                <ReturnComponent type='error' list={error}/>
                                            </div>
                                            <div className="form-field">
                                                <input onChange={(e)=>setEmail(e.target.value)} type="text" name="email" placeholder="E-mail"/>
                                            </div>
                                            <div className="form-field">
                                                <input onChange={(e)=>handlePassword(e.target.value)} type="password" name="password" placeholder="Password"/>
                                            </div>
                                            <div className="form-field">
                                                <button onClick={()=>makeLogin()}>
                                                    {!loading && <span>Login</span>}
                                                    {loading && <i className="lni lni-spinner-solid"></i>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthContextProvider>
            </AppContextProvider>
        </>
    );

};