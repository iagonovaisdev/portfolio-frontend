import { useContext, useEffect, useState } from 'react';
import '../../styles/style.scss';

import AppContextProvider from '../../../context/AppContext/AppContextProvider';
import AuthContextProvider from '../../context/authContext/authContextProvider';

import PanelUp from '../../components/templates/panelUp';
import PanelBreadcrumb from '../../components/templates/panelBreadcrumb';
import PanelBottom from '../../components/templates/panelBottom';
import PanelField from '../../components/templates/panelField';
import PanelForm from '../../components/templates/panelForm';

import ReturnComponent from '../../../components/returnComponent';

import { PrivateApi } from '../../api/privateApi';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/authContext';
import PanelFieldImage from '../../components/templates/panelFieldImage';

export default function PanelIntro() {

    const {id} = useParams();

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
                "experience": "",
                "clients": "",
                "projects": ""
            },
            "en_us": {
                "experience": "",
                "clients": "",
                "projects": ""
            }
        }
    }
    const [data,setData] = useState(dataModel);
    const [codes,setCodes] = useState([]);
    
    const loadData = async () => {

        await PrivateApi.get('/numbers/')
        .then((result)=>{
            console.log(result.data.response[0]);
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.cover = result.data.response[0].cover;
            setData(updateData);
        })
        .catch(()=>{
        });

    };
    
    const handleData = (language,e) => {
        let update = {...data};
        if(e.target.name == "cover"){
            update[e.target.name] = e.target.value;
        } else {
            update["content"][language][e.target.name] = e.target.value;
        }
        setData(update);
    };

    const handleSubmit = async () => {

        setLoader(true);
        console.log(data);
        await PrivateApi.post('/numbers/',data,{
            headers: {
                'authorization': auth.token
            }
        })
        .then(()=>{
            setCallback({
                ...callback,
                "type": "success",
                "msg": ["Editado com sucesso"]
            });
            setLoader(false);
        })
        .catch((e)=>{
            setCallback({
                ...callback,
                "type": "error",
                "msg": ["Erro ao editar"+e]
            });
            setLoader(false);
        });

    };

    useEffect(()=>{
        loadData();
    },[setData]);

    return(
        <>  
            <AppContextProvider>
                <AuthContextProvider>
                    <div className="panel">
                        <PanelUp/>
                        <div className="panel-middle">
                            <PanelBreadcrumb
                            content={{
                                "title":"Números",
                                "list":[
                                    {'title':'Painel','href':'/panel','active':''},
                                    {'title':'Números','href':'/panel/numbers/','active':'true'}
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
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='experience' label='Experiência' value={data['content']['pt_br'].experience}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='clients' label='Clientes:' value={data['content']['pt_br'].clients}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='projects' label='Projetos:' value={data['content']['pt_br'].projects}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Salvar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='experience' label='Experiência:' value={data['content']['en_us'].experience}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='clients' label='Clientes:' value={data['content']['en_us'].clients}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='projects' label='Projetos:' value={data['content']['en_us'].projects}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Save'/>
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