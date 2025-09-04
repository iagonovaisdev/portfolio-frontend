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

export default function PanelStackEdit() {

    const {id} = useParams();

    const {auth} = useContext(AuthContext);

    const [loader,setLoader] = useState(false);
    const [callback,setCallback] = useState({
        'type': '',
        'msg': []
    });
    const dataModel = {
        "category": "",
        "color": "",
        "parent": "",
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
    
    const loadData = async () => {

        if(!id) return;
        await PrivateApi.get('/stack/'+id)
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.category = result.data.response[0].category;
            updateData.parent = result.data.response[0].parent;
            updateData.color = result.data.response[0].color;
            setData(updateData);
            console.log(result.data.response);
        })
        .catch(()=>{
        });

    };

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
        // console.log(update);
    };

    const handleSubmit = async () => {

        setLoader(true);
        await PrivateApi.put('/stack/update/'+id,data,{
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
        getCategories();
        getParents();
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
                                "title":"Editar stack",
                                "list":[
                                    {'title':'Painel','href':'/panel','active':''},
                                    {'title':'Stack','href':'/panel/stack','active':''},
                                    {'title':'Editar','href':'/panel/stack/edit/'+id,'active':'true'}
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
                                                        <PanelField handleData={handleData} type='select' name='category' label='Categoria:' value={categories} defaultValue={data.category}/>
                                                        <PanelField handleData={handleData} type='select' name='parent' label='Pai:' value={parents} defaultValue={data.parent}/>
                                                        <PanelField handleData={handleData} type='text' name='color' label='Cor:' value={data.color}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='title' label='Título:' value={data['content']['pt_br'].title}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='subtitle' label='Subtítulo:' value={data['content']['pt_br'].subtitle}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='description' label='Descrição:' value={data['content']['pt_br'].description}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Salvar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelField handleData={handleData} type='select' name='category' label='Category:' value={categories} defaultValue={data.category}/>
                                                        <PanelField handleData={handleData} type='select' name='parent' label='Parent:' value={parents} defaultValue={data.parent}/>
                                                        <PanelField handleData={handleData} type='text' name='color' label='Color:' value={data.color}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='title' label='Title:' value={data['content']['en_us'].title}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='subtitle' label='Subtitle:' value={data['content']['en_us'].subtitle}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='description' label='Description:' value={data['content']['en_us'].description}/>
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