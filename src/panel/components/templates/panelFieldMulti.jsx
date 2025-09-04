import { useContext, useEffect, useState } from "react";

import { PrivateApi } from '../../api/privateApi';
import { AuthContext } from '../../context/authContext/authContext';
import PanelField from "./panelField";

/* eslint-disable react/prop-types */
export default function PanelFieldMulti(props){

    const {auth} = useContext(AuthContext);

    const [url,setUrl] = useState(props.value);
   
    const dataModel = {
        'image':'',
        'title':'',
        'video':'',
        'description':''
    };
    const [data,setData] = useState([]);

    // Data

        const handleData = (e,i) => {
            let update = [...data];
            update[i][e.target.name] = e.target.value;
            setData(update);
        };

        const add = () => {
            let newData = [...data];
            newData.push({
                'image':'',
                'title':'',
                'video':'',
                'description':''
            });
            setData(newData);
            let newStage = [...stage];
            newStage.push({'stage':'select'});
            setStage(newStage);
        };

        const remove = (i) => {
            if(confirm("Tem certeza que deseja remover o item?")){
                let newData = [...data];
                newData.splice(i, 1);
                setData(newData);
            };
        };

    // Image

        const [stage,setStage] = useState([]);

        const handleStage = (i,v) => {
            let newStage = [...stage];
            newStage[i] = {'stage':v};
            setStage(newStage);
        };

        const changeUrl = (i,url) =>{
            let update = [...data];
            update[i]['image'] = url;
            setData(update);
        };

        const handleUpload = async (e,i) => {
            handleStage(i,'loading');
            const data = new FormData();
            data.append('file', e.target.files[0]);
            await PrivateApi.post('/media',data,{
                headers: {
                    'authorization': auth.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                handleStage(i,'loaded');
                if(response.data.response.url){
                    changeUrl(i,response.data.response.url);
                };
            })
            .catch((error)=>{
                if(error.response){
                    alert(error.response.data.errors);
                    handleStage(i,'select');
                    changeUrl(i,"");
                };
            });
        };

        const removeImage = (i) => {
            if(confirm("Tem certeza que deseja remover o arquivo?")){
                let update = [...data];
                update[i]['image'] = '';
                setData(update);
                handleStage(i,'select');
            };
        };

    useEffect(()=>{
        

    },[props.value]);

    return(
        <>
        {JSON.stringify(data)}
            <div className="multiField">
                <label htmlFor={props.name}>{props.label}</label>
                <div className="multiFieldBar">
                    <div onClick={add} className="multiFieldBarButton panel-content-button">
                        <span>Adicionar</span>
                        <i className="lni lni-plus"></i>
                    </div>
                </div>
                <div className="multiFieldList">
                    { data && data.map((item,i)=>
                        <div key={i} className="multiFieldListItem">
                            <div className="multiFieldListItemBar">
                                <div className="multiFieldListItemBarButton" onClick={(e)=>remove(i)}>
                                    <i className="lni lni-trash-can"></i>
                                    <span>Remover</span>
                                </div>
                            </div>
                            <div className="multiFieldListItemContent">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="panel-field-image">
                                            <label>Imagem:</label>
                                            <div className={`holder stage-${stage[i].stage} select`}>
                                                <input type="file" onChange={(e)=>{handleUpload(e,i)}} name="fileHandle"/>
                                                <input type="hidden" name="url" value={item.image}/>
                                                <div className="image"  style={{backgroundImage: `url(${item.image})`}}>
                                                    <div className={`action select`}>
                                                        <i className="lni lni-upload"></i>
                                                        <span>Selecionar arquivo</span>
                                                    </div>
                                                    <div className={`action loading`}>
                                                        <i className="lni lni-spinner-solid"></i>
                                                        <span>Carregando arquivo...</span>
                                                    </div>
                                                    <div className={`action remove`} onClick={(e)=>removeImage(i)}>
                                                        <i className="lni lni-trash-can"></i>
                                                        <span>Remover arquivo</span>
                                                    </div>
                                                </div>
                                            </div>                
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <label htmlFor="title">Título:</label>
                                        <input onChange={(e)=>handleData(e,i)} type="text" name='title' value={data[i].title}/>
                                        <label htmlFor="video">Vídeo (URL do Youtube):</label>
                                        <input onChange={(e)=>handleData(e,i)} type="text" name='video' value={data[i].video}/>
                                        <label htmlFor="description">Descrição:</label>
                                        <textarea name='description'></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );

}