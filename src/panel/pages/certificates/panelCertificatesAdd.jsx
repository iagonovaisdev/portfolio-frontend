import { useContext, useEffect, useState } from 'react';
import '../../styles/style.scss';

import AppContextProvider from '../../../context/AppContext/AppContextProvider';
import AuthContextProvider from '../../context/authContext/authContextProvider';
import {AuthContext} from '../../context/authContext/authContext';

import PanelUp from '../../components/templates/panelUp';
import PanelBreadcrumb from '../../components/templates/panelBreadcrumb';
import PanelBottom from '../../components/templates/panelBottom';
import PanelField from '../../components/templates/panelField';
import PanelFieldImage from '../../components/templates/panelFieldImage';
import PanelForm from '../../components/templates/panelForm';

import ReturnComponent from '../../../components/returnComponent';

import { PrivateApi } from '../../api/privateApi';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function PanelCertificatesAdd() {

    const {auth} = useContext(AuthContext);

    const [loader,setLoader] = useState(false);
    const [callback,setCallback] = useState({
        'type': '',
        'msg': []
    });
    const dataModel = {
        "cover": "",
        "content": {
            "pt_br": {
                "title": "",
                "description": ""
            },
            "en_us": {
                "title": "",
                "description": ""
            }
        }
    }
    const [data,setData] = useState(dataModel);
        
    const handleData = (language,e) => {
        let update = {...data};
        if(e.target.name == "cover"){
            update[e.target.name] = e.target.value;
        } else {
            update["content"][language][e.target.name] = e.target.value;
        }
        setData(update);
        console.log(update);
    };

    const handleSubmit = async () => {

        setLoader(true);
        await PrivateApi.post('/certificates',data,{
            headers: {
                'authorization': auth.token
            }
        })
        .then(()=>{
            setCallback({
                ...callback,
                "type": "success",
                "msg": ["Cadastrado com sucesso"]
            });
            setData(dataModel);
            setLoader(false);
        })
        .catch(()=>{
            setCallback({
                ...callback,
                "type": "error",
                "msg": ["Erro ao cadastrar"]
            });
            setLoader(false);
        });

    };

    useEffect(()=>{
    },[]);

    return(
        <>  
            <AppContextProvider>
                <AuthContextProvider>
                    <div className="panel">
                        <PanelUp/>
                        <div className="panel-middle">
                            <PanelBreadcrumb
                            content={{
                                "title":"Adicionar certificado",
                                "list":[
                                    {'title':'Painel','href':'/control','active':''},
                                    {'title':'Certificados','href':'/control/certificates','active':''},
                                    {'title':'Adicionar','href':'/control/certificates/add','active':'true'}
                                ]
                            }}
                            />
                            
                            <div className="panel-content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <Tabs
                                            defaultActiveKey="pt_br"
                                            id="manager" 
                                            >
                                                <Tab eventKey="pt_br" title="PT-BR">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelFieldImage handleData={handleData} name='cover' label='Capa:' value={data.cover}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='title' label='Título:' value={data['content']['pt_br'].title}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='textarea' name='description' label='Descrição:' value={data['content']['pt_br'].description}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Cadastrar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelFieldImage handleData={handleData} name='cover' label='Cover:' value={data.cover}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='title' label='Title:' value={data['content']['en_us'].title}/>
                                                        <PanelField language="en_us" handleData={handleData} type='textarea' name='description' label='Description:' value={data['content']['en_us'].description}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Submit'/>
                                                    </PanelForm>
                                                </Tab>
                                            </Tabs>

                                        </div>
                                    </div>
                                </div>
                            </div>                           

                        </div>
                        <PanelBottom/>
                    </div>
                </AuthContextProvider>
            </AppContextProvider>
        </>
    );

}