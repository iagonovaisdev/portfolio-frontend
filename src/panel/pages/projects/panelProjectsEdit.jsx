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

export default function PanelProjectsEdit() {

    const {id} = useParams();

    const {auth} = useContext(AuthContext);

    const [loader,setLoader] = useState(false);
    const [callback,setCallback] = useState({
        'type': '',
        'msg': []
    });
    const dataModel = {
        "cover": "",
        "category": "",
        "code": "",
        "content": {
            "pt_br": {
                "url": "",
                "url_code": "",
                "video": "",
                "title": "",
                "excerpt": "",
                "content": ""
            },
            "en_us": {
                "url": "",
                "url_code": "",
                "video": "",
                "title": "",
                "excerpt": "",
                "content": ""
            }
        }
    }
    const [data,setData] = useState(dataModel);
    const [codes,setCodes] = useState([]);
    const [categories,setCategories] = useState([]);

    const getCategories = (limit = 15) => {
        PrivateApi.get('/projects-categories?limit='+limit).then((result)=>{
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
    
    const loadData = async () => {
        if(!id) return;
        await PrivateApi.get('/projects/'+id)
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.cover = result.data.response[0].cover;
            updateData.code = result.data.response[0].code;
            updateData.category = result.data.response[0].category;
            updateData.url = result.data.response[0].url;
            setData(updateData);
        })
        .catch(()=>{
        });
    };
    
    const handleData = (language,e) => {
        let update = {...data};
        if(e.target.name == "cover" || e.target.name == "code" || e.target.name == "category"){
            update[e.target.name] = e.target.value;
        } else {
            update["content"][language][e.target.name] = e.target.value;
        }
        setData(update);
    };

    const handleSubmit = async () => {
        setLoader(true);
        await PrivateApi.put('/projects/update/'+id,data,{
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
        setCodes([
            { "_id":"1", 'content': { 'pt_br': {"title":"Aberto"}, 'en_us': {"title":"Open"} } },
            { "_id":"2", 'content': { 'pt_br': {"title":"Fechado"}, 'en_us': {"title":"Closed"} } }
        ]);
        getCategories();
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
                                "title":"Editar projeto",
                                "list":[
                                    {'title':'Painel','href':'/control','active':''},
                                    {'title':'Projetos','href':'/control/projects','active':''},
                                    {'title':'Editar','href':'/control/projects/edit/'+id,'active':'true'}
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
                                                        <PanelFieldImage language="pt_br" handleData={handleData} name='cover' label='Capa:' value={data.cover}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='select' name='code' label='Código:' value={codes} defaultValue={data.code}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='select' name='category' label='Categoria:' value={categories} defaultValue={data.category}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='url' label='URL (Live):' value={data['content']['pt_br'].url}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='url_code' label='URL (Code):' value={data['content']['pt_br'].url_code}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='video' label='Vídeo:' value={data['content']['pt_br'].video}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='title' label='Título:' value={data['content']['pt_br'].title}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='textarea' name='excerpt' label='Resumo:' value={data['content']['pt_br'].excerpt}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='textarea' name='content' label='Conteúdo:' value={data['content']['pt_br'].content}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Salvar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelFieldImage language="en_us" handleData={handleData} name='cover' label='Capa:' value={data.cover}/>
                                                        <PanelField language="en_us" handleData={handleData} type='select' name='code' label='Code:' value={codes} defaultValue={data.code}/>
                                                        <PanelField language="en_us" handleData={handleData} type='select' name='category' label='Category:' value={categories} defaultValue={data.category} />
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='url' label='URL (Live):' value={data['content']['en_us'].url}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='url_code' label='URL (Code):' value={data['content']['en_us'].url_code}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='video' label='Vídeo:' value={data['content']['en_us'].video}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='title' label='Title:' value={data['content']['en_us'].title}/>
                                                        <PanelField language="en_us" handleData={handleData} type='textarea' name='excerpt' label='Excerpt:' value={data['content']['en_us'].excerpt}/>
                                                        <PanelField language="en_us" handleData={handleData} type='textarea' name='content' label='Content:' value={data['content']['en_us'].content}/>
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