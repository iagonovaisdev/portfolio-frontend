import { useContext, useEffect, useState } from 'react';
import '../../styles/style.scss';

import AppContextProvider from '../../../context/AppContext/AppContextProvider';
import AuthContextProvider from '../../context/authContext/authContextProvider';
import {AuthContext} from '../../context/authContext/authContext';

import PanelUp from '../../components/templates/panelUp';
import PanelBreadcrumb from '../../components/templates/panelBreadcrumb';
import PanelBottom from '../../components/templates/panelBottom';
import PanelField from '../../components/templates/panelField';
import PanelForm from '../../components/templates/panelForm';

import ReturnComponent from '../../../components/returnComponent';

import { PrivateApi } from '../../api/privateApi';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function PanelStackAdd() {

    const {auth} = useContext(AuthContext);

    const [loader,setLoader] = useState(false);
    const [callback,setCallback] = useState({
        'type': '',
        'msg': []
    });
    const dataModel = {
        "category": "",
        "parent": "",
        "color": "",
        "content": {
            "pt_br": {
                "title": "",
                "subtitle": "",
                "description": ""
            },
            "en_us": {
                "title": "",
                "subtitle": "",
                "description": ""
            }
        }
    }
    const [data,setData] = useState(dataModel);
    const [categories,setCategories] = useState([]);
    const [parents,setParents] = useState([]);

    const getCategories = (limit = 15) => {
        PrivateApi.get('/stack-category?limit='+limit).then((result)=>{
            let newData = [];
            result.data.response.map((item)=>{
                let newItem = {};
                if( JSON.parse(item.content) ) { 
                    newItem.content = JSON.parse(item.content);
                }
                newItem._id = item._id;
                newData.push(newItem); 
            });
            setCategories(newData);
            console.log(newData);
        }).catch(()=>{
            console.log("erro");
        });
    };

    const getParents = (limit = 15) => {
        PrivateApi.get('/stack?limit='+limit).then((result)=>{
            let newData = [];
            result.data.response.map((item)=>{
                let newItem = {};
                if( JSON.parse(item.content) ) { 
                    newItem.content = JSON.parse(item.content);
                }
                newItem._id = item._id;
                newData.push(newItem); 
            });
            setParents(newData);
            console.log(newData);
        }).catch(()=>{
            console.log("erro");
        });
    };
    
    const handleData = (language,e) => {
        let update = {...data};
        if(e.target.name == "color" || e.target.name == "category" || e.target.name == "parent"){
            update[e.target.name] = e.target.value;
        } else {
            update["content"][language][e.target.name] = e.target.value;
        }
        setData(update);
        console.log(update);
    };

    const handleSubmit = async () => {

        setLoader(true);
        await PrivateApi.post('/stack',data,{
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
        getCategories();
        getParents();
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
                                "title":"Adicionar stack",
                                "list":[
                                    {'title':'Painel','href':'/control','active':''},
                                    {'title':'Stack','href':'/control/stack','active':''},
                                    {'title':'Adicionar','href':'/control/stack/add','active':'true'}
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
                                                        <PanelField defaultValue={data.category} handleData={handleData} type='select' name='category' label='Categoria:' value={categories}/>
                                                        <PanelField defaultValue={data.parent} handleData={handleData} type='select' name='parent' label='Pai:' value={parents}/>
                                                        <PanelField handleData={handleData} type='text' name='color' label='Cor:' value={data.color}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='title' label='Título:' value={data['content']['pt_br'].title}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='subtitle' label='Subtítulo:' value={data['content']['pt_br'].subtitle}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='description' label='Descrição:' value={data['content']['pt_br'].description}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Cadastrar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelField defaultValue={data.category} handleData={handleData} type='select' name='category' label='Category:' value={categories}/>
                                                        <PanelField defaultValue={data.parent} handleData={handleData} type='select' name='parent' label='Pai:' value={parents}/>
                                                        <PanelField defaultValue={data.color} handleData={handleData} type='text' name='color' label='Color:' value={data.color}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='title' label='Title:' value={data['content']['en_us'].title}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='subtitle' label='Subtitle:' value={data['content']['en_us'].subtitle}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='description' label='Description:' value={data['content']['en_us'].description}/>
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