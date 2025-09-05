import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import LandingSlider from "./landingSlider";
import { PublicApiGet } from "../../../api/publicApi";
import LoadingComponent from "../../../components/loadingComponent";
import ReturnComponent from "../../../components/returnComponent";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingExperience() {

    const {translation} = useContext(AppContext);

    const [loadingExperience,setLoadingExperience] = useState(false);  
    const [errorExperience,setErrorExperience] = useState([]);
    const [experiences,setExperiences] = useState([]);

    const [loadingCertificates,setLoadingCertificates] = useState(false);
    const [errorCertificates,setErrorCertificates] = useState([]);
    const [certificates,setCertificates] = useState([]);

    const loadExperiences = async () => {
        await PrivateApi.get('/experience/',{
            params: {
                limit: 99
            }
        })
        .then((result)=>{
            let updateData = [];
            for (let i = 0; i < result.data.response.length; i++) {
                let item = result.data.response[i];
                if( JSON.parse(item.content) ){
                    item.content = JSON.parse(item.content);
                }
                updateData.push(item);
            }
            setExperiences(updateData);
        })
        .catch(()=>{
        });
    };

    const loadingCertificate = async () => {
        await PrivateApi.get('/certificates/',{
            params: {
                limit: 99
            }
        })
        .then((result)=>{
            let updateData = [];
            for (let i = 0; i < result.data.response.length; i++) {
                let item = result.data.response[i];
                if( JSON.parse(item.content) ){
                    item.content = JSON.parse(item.content);
                }
                updateData.push(item);
            }
            setCertificates(updateData);
        })
        .catch(()=>{
        });
    };

    useEffect( () => {

        loadExperiences();
        loadingCertificate();

    },[] );

    return(
        <div id="experience" className="section experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <span className="title">{translation.landing.experience.title}</span>
                            <span className="subtitle">{translation.landing.experience.subtitle}</span>
                            <span className="description">{translation.landing.experience.description}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box auto_height_item">
                            <div className="box-title">
                                <i className='lni lni-list'></i>
                                <span>{translation.landing.experience.experience}</span>
                            </div>
                            <div className="box-content">
                                {experiences.length >= 1 &&
                                    <div className="list-data">
                                        {experiences.map( (experience,i) =>
                                            <div key={i} className="data">
                                                    <div className="name">{experience.content[translation.code].title}</div>
                                                    <div className="time">
                                                        <span className="start">De {experience.year_start}</span>
                                                        <span className="end">Até o {experience.year_end}</span>
                                                    </div>
                                                    <div className="text">{experience.content[translation.code].description}</div>
                                                    <div className="tecs">
                                                        <span><strong>{translation.landing.experience.tech}: </strong> {experience.tech}</span>
                                                    </div>
                                            </div>
                                        )}
                                    </div>
                                }
                                <LoadingComponent name={`${translation.landing.loading}...`} status={loadingExperience}/>
                                <ReturnComponent type="error" list={errorExperience}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box">
                            <div className="box-title">
                                <i className='lni lni-certificate'></i>
                                <span>{translation.landing.experience.certificate}</span><br/><br/>
                            </div>
                            {certificates.length >= 1 &&
                                <div className="box-content">
                                    <LandingSlider name='slickExperience'>
                                        {certificates.map( (certificate,i) => 
                                            <div key={i} className="slick-slider-item">
                                                <div className="slick-slider-item-holder certificate">
                                                    <div className="certificate-image">
                                                        <div className="holder">
                                                            <img src={certificate.cover}/>
                                                        </div>
                                                    </div>
                                                    <span className="certificate-name">{certificate.content[translation.code].title}</span>
                                                </div>
                                            </div>
                                        )}
                                    </LandingSlider>
                                </div>
                            }
                            <LoadingComponent name={`${translation.landing.loading}...`} status={loadingCertificates}/>
                            <ReturnComponent type="error" list={errorCertificates}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}