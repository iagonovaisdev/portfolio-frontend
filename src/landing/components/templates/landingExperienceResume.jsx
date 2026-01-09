import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import LandingSlider from "./landingSlider";
import { PublicApiGet } from "../../../api/publicApi";
import LoadingComponent from "../../../components/loadingComponent";
import ReturnComponent from "../../../components/returnComponent";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingExperienceResume() {

    const {translation} = useContext(AppContext);

    const [loadingExperience,setLoadingExperience] = useState(false);  
    const [errorExperience,setErrorExperience] = useState([]);
    const [experiences,setExperiences] = useState([]);

    const [loadingCertificates,setLoadingCertificates] = useState(false);
    const [errorCertificates,setErrorCertificates] = useState([]);
    const [certificates,setCertificates] = useState([]);

    const [trajectory,setTrajectory] = useState([]);

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

    const loadTrajectory = async () => {
        await PrivateApi.get('/trajectory/',{
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
            setTrajectory(updateData);
        })
        .catch(()=>{
        });
    };

    useEffect( () => {

        loadExperiences();
        loadingCertificate();
        loadTrajectory();

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
                                                        <span className="start">{experience.content[translation.code].year_start}</span>
                                                        <span className="end">{experience.content[translation.code].year_end}</span>
                                                    </div>
                                                    <div className="text">{experience.content[translation.code].description}</div>
                                                    <div className="tecs">
                                                        <span><strong>{translation.landing.experience.tech}: </strong> {experience.content[translation.code].tech}</span>
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
                        <div className="box auto_height_item">
                            <div className="box-title">
                                <i className='lni lni-certificate'></i>
                                <span>{translation.landing.experience.certificate}</span>
                            </div>
                            <div className="box-content">
                                {certificates.length >= 1 &&
                                    <div className="list-data">
                                        {certificates.map( (certificate,i) =>
                                            <div key={i} className="data">
                                                <div className="name">{certificate.content[translation.code].title}</div>
                                                <div className="text">{certificate.content[translation.code].description}</div>
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
                        <div className="box auto_height_item">
                            <div className="box-title">
                                <i className='lni lni-calendar'></i>
                                <span>{translation.landing.roadmap.title}</span>
                            </div>
                            <div className="box-content">
                                {trajectory.length >= 1 &&
                                    <div className="list-data">
                                        {trajectory.map( (road,i) =>
                                            <div key={i} className="data">
                                                <div className="name">{road.year}</div>
                                                <div className="text">
                                                    {road.content[translation.code].description}
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
            </div>
        </div>
    );

}