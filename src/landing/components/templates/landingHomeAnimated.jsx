import React, { useContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { AppContext } from "../../../context/AppContext/AppContext";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingHome() {

    const {translation} = useContext(AppContext);
    const [seo,setSeo] = useState({
        "content":{
            "pt_br": {
                "title":"",
                "description":""
            },
            "en_us": {
                "title":"",
                "description":""
            },
        },
        "cover":""
    });
    const [data,setData] = useState({
        "content":{
            "pt_br": {
                "title":"",
            },
            "en_us": {
                "title":"",
            },
        }
    });
    const loadSEO = async () => {
        await PrivateApi.get('/seo/')
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.cover = result.data.response[0].cover;
            setSeo(updateData);
        })
        .catch(()=>{
        });
    };
    const loadData = async () => {
        await PrivateApi.get('/intro/')
        .then((result)=>{
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
    useEffect(()=>{
        loadData();
        loadSEO();
    },[]);

    return(
        <>
            <Helmet>
                <title>{seo.content[translation.code].title}</title>
                <meta name="description" content={seo.content[translation.code].description}/>
                <link rel="shortcut icon" href={seo.cover} type="image/x-icon"/>
                <link rel="icon" href={seo.cover} type="image/x-icon"/>
            </Helmet>
            <div id="home" className="home">
                <div className="videohero">
                    {data?.cover && (
                        <video autoPlay loop muted playsInline preload="auto">
                            <source src={data.cover} type="video/mp4"/>
                        </video>
                    )}
                </div>
                <div className="bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <span className="home-title">{data.content[translation.code].title}</span>
                                <span className="home-subtitle"><strong>{data.content[translation.code].role}</strong> {data.content[translation.code].subtitle}</span>
                                <span className="home-text">
                                    {data.content[translation.code].description}
                                </span>
                                <div className="social">
                                    {data.content[translation.code].linkedin && <a title="Linkedin" href={data.content[translation.code].linkedin} target="_blank"><i className="lni lni-linkedin"></i></a>}
                                    {data.content[translation.code].github && <a title="Github" href={data.content[translation.code].github} target="_blank"><i className="lni lni-github"></i></a>}
                                    {data.content[translation.code].youtube && <a title="Youtube" href={data.content[translation.code].youtube} target="_blank"><i className="lni lni-youtube"></i></a>}
                                    {data.content[translation.code].instagram && <a title="Instagram" href={data.content[translation.code].instagram} target="_blank"><i className="lni lni-instagram"></i></a>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-scroll">
                                    <a href="#about">
                                        <i className="lni lni-arrow-down"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="holder"></div>
            </div>
        </>
    );

};