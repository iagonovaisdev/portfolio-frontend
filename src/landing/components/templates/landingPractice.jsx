import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingPractice() {

    const {translation} = useContext(AppContext);

    const [practice,setPractice] = useState({
        "content":{
            "pt_br": {
                "description":"",
                "highlights":[],
                "video":"",
                "link":""
            },
            "en_us": {
                "description":"",
                "highlights":[],
                "video":"",
                "link":""
            },
        }
    });
    const loadPractice = async () => {
        await PrivateApi.get('/practice/')
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.cover = result.data.response[0].cover;
            if( updateData.content.pt_br.highlights ){
                updateData.content.pt_br.highlights = updateData.content.pt_br.highlights.split("\n")
            }
            if( updateData.content.en_us.highlights ){
                updateData.content.en_us.highlights = updateData.content.en_us.highlights.split("\n")
            }
            setPractice(updateData);
        })
        .catch(()=>{
        });
    };

    useEffect( () => {
        loadPractice();
    },[]);

    return(
        <div id="practice" className="section practice">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <span className="title">{translation.landing.practice.title}</span>
                            <span className="subtitle">{translation.landing.practice.subtitle}</span>
                            <span className="description">{translation.landing.practice.description}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="practice-box">
                            <h1>
                                {practice.content[translation.code].description}
                            </h1>
                            <h2>Highlights:</h2>
                            <ul>
                                {practice.content[translation.code].highlights.map( (highlight,i) =>
                                    <li key={i}>{highlight}</li>
                                )}
                            </ul>
                        </div>
                        {practice.content[translation.code].link &&<div className="generic-button generic-button-mt20">
                            <a href={practice.content[translation.code].link} target="_blank">{practice.content[translation.code].action} <i className={practice.content[translation.code].icon}></i></a>
                        </div>}
                    </div>
                    {practice.cover && <div className="col-md-6">
                        <div className="practice-box">
                            <iframe src={practice.cover} allowfullscreen></iframe>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );

}