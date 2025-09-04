import { useContext, useEffect, useState } from "react";

import { PrivateApi } from '../../api/privateApi';
import { AuthContext } from '../../context/authContext/authContext';

/* eslint-disable react/prop-types */
export default function PanelFieldImage(props){

    const {auth} = useContext(AuthContext);

    const [stage,setStage] = useState('select');
    const [url,setUrl] = useState(props.value);

    const changeUrl = (url) =>{
        setUrl(url);
        props.handleData(props.language,{
            "target":{
                "name": props.name,
                "value": url
            }
        });
    };

    const handleChange = async (e) => {
        setStage('loading');
        const data = new FormData();
        data.append('file', e.target.files[0]);
        await PrivateApi.post('/media',data,{
            headers: {
                'authorization': auth.token,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            setStage('loaded');
            if(response.data.response.url){
                changeUrl(response.data.response.url);
                props.handleData();
            };
        })
        .catch((error)=>{
            if(error.response){
                alert(error.response.data.errors);
                setStage('select');
                changeUrl("");
            };
        });
    };

    const remove = () => {
        if(confirm("Tem certeza que deseja remover o arquivo?")){
            changeUrl('');
            setStage('select');
        };
    };

    useEffect(()=>{
        if(props.value){
            changeUrl(props.value);
            setStage("loaded");
        };
    },[props.value]);

    return(
        <>
            <div className="panel-field-image">
                <label htmlFor={props.name}>{props.label}</label>
                <div className={`holder stage-${stage} select`}>
                    <input type="file" onChange={(e)=>{handleChange(e)}} name={props.name}/>
                    <input type="hidden" name="url" value={url}/>
                    <div className="image"  style={{backgroundImage: `url(${url})`}}>
                        <div className={`action select`}>
                            <i className="lni lni-upload"></i>
                            <span>Selecionar arquivo</span>
                        </div>
                        <div className={`action loading`}>
                            <i className="lni lni-spinner-solid"></i>
                            <span>Carregando arquivo...</span>
                        </div>
                        <div className={`action remove`} onClick={remove}>
                            <i className="lni lni-trash-can"></i>
                            <span>Remover arquivo</span>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    );

}