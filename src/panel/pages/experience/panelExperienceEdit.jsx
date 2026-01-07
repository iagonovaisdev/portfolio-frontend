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

export default function PanelExperienceEdit() {

    const {id} = useParams();

    const {auth} = useContext(AuthContext);

    const [loader,setLoader] = useState(false);
    const [callback,setCallback] = useState({
        'type': '',
        'msg': []
    });
    const dataModel = {
        "content": {
            "pt_br": {
                "year_start": "",
                "year_end": "",
                "tech": "",
                "title": "",
                "description": ""
            },
            "en_us": {
                "year_start": "",
                "year_end": "",
                "tech": "",
                "title": "",
                "description": ""
            }
        }
    }
    const [data,setData] = useState(dataModel);
    
    const loadData = async () => {

        if(!id) return;
        await PrivateApi.get('/experience/'+id)
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.year_start = result.data.response[0].year_start;
            updateData.year_end = result.data.response[0].year_end;
            updateData.tech = result.data.response[0].tech;
            setData(updateData);
        })
        .catch(()=>{
        });

    };
    
    const handleData = (language,e) => {
        let update = {...data};
        update["content"][language][e.target.name] = e.target.value;
        setData(update);
        // console.log(update);
    };

    const handleSubmit = async () => {

        setLoader(true);
        await PrivateApi.put('/experience/update/'+id,data,{
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
                                "title":"Editar experiência",
                                "list":[
                                    {'title':'Painel','href':'/control','active':''},
                                    {'title':'Experiência','href':'/control/experience','active':''},
                                    {'title':'Editar','href':'/control/experience/edit/'+id,'active':'true'}
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
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='year_start' label='Ano inicial:' value={data['content']['pt_br'].year_start}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='year_end' label='Ano final:' value={data['content']['pt_br'].year_end}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='tech' label='Tecnologias:' value={data['content']['pt_br'].tech}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='title' label='Título:' value={data['content']['pt_br'].title}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='textarea' name='description' label='Descrição:' value={data['content']['pt_br'].description}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Salvar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='year_start' label='Start year:' value={data['content']['en_us'].year_start}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='year_end' label='End year:' value={data['content']['en_us'].year_end}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='tech' label='Techs:' value={data['content']['en_us'].tech}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='title' label='Title:' value={data['content']['en_us'].title}/>
                                                        <PanelField language="en_us" handleData={handleData} type='textarea' name='description' label='Description:' value={data['content']['en_us'].description}/>
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