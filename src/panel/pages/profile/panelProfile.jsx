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

export default function PanelProfile() {

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
                "name": "",
                "age": "",
                "nationality": "",
                "graduation": "",
                "portuguese": "",
                "english": "",
                "linkedin": "",
                "github": "",
                "youtube": "",
                "instagram": ""
            },
            "en_us": {
                "name": "",
                "age": "",
                "nationality": "",
                "graduation": "",
                "portuguese": "",
                "english": "",
                "linkedin": "",
                "github": "",
                "youtube": "",
                "instagram": ""
            }
        }
    }
    const [data,setData] = useState(dataModel);
    const [codes,setCodes] = useState([]);
    
    const loadData = async () => {

        await PrivateApi.get('/profile/')
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
        await PrivateApi.post('/profile/',data,{
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
                                "title":"Perfil",
                                "list":[
                                    {'title':'Painel','href':'/panel','active':''},
                                    {'title':'Profile','href':'/panel/profile','active':''},
                                    {'title':'Gerenciar','href':'/panel/profile/','active':'true'}
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
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='name' label='Nome:' value={data['content']['pt_br'].name}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='age' label='Idade:' value={data['content']['pt_br'].age}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='nationality' label='Naturalidade:' value={data['content']['pt_br'].nationality}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='graduation' label='Ensino:' value={data['content']['pt_br'].graduation}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='portuguese' label='Português:' value={data['content']['pt_br'].portuguese}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='english' label='Inglês:' value={data['content']['pt_br'].english}/>
                                                        <strong>Redes sociais:</strong>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='linkedin' label='Linkedin:' value={data['content']['pt_br'].linkedin}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='github' label='Github:' value={data['content']['pt_br'].github}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='youtube' label='Youtube:' value={data['content']['pt_br'].youtube}/>
                                                        <PanelField language="pt_br" handleData={handleData} type='text' name='instagram' label='Instagram:' value={data['content']['pt_br'].instagram}/>
                                                        <PanelField submit={handleSubmit} setLoader={setLoader} loader={loader} type='submit' value='Salvar'/>
                                                    </PanelForm>
                                                </Tab>
                                                <Tab eventKey="en_us" title="EN-US">
                                                    <PanelForm>
                                                        <ReturnComponent type={callback.type} list={callback.msg}/>
                                                        <PanelFieldImage language="pt_br" handleData={handleData} name='cover' label='Capa:' value={data.cover}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='name' label='Name:' value={data['content']['en_us'].name}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='age' label='Age:' value={data['content']['en_us'].age}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='nationality' label='Nationality:' value={data['content']['en_us'].nationality}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='graduation' label='Graduation:' value={data['content']['en_us'].graduation}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='portuguese' label='Portuguese:' value={data['content']['en_us'].portuguese}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='english' label='English:' value={data['content']['en_us'].english}/>
                                                        <strong>Social networks:</strong>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='linkedin' label='Linkedin:' value={data['content']['en_us'].linkedin}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='github' label='Github:' value={data['content']['en_us'].github}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='youtube' label='Youtube:' value={data['content']['en_us'].youtube}/>
                                                        <PanelField language="en_us" handleData={handleData} type='text' name='instagram' label='Instagram:' value={data['content']['en_us'].instagram}/>
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