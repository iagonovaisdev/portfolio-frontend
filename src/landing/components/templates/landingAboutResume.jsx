import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import { parseContentRecursively,getInnerObject } from "../../../utils/utils";
import LoadingComponent from "../../../components/loadingComponent";
import ReturnComponent from "../../../components/returnComponent";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingAbout() {

    const {translation} = useContext(AppContext);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const [skills,setSkills] = useState([]);

    const [about,setAbout] = useState({
        "content":{
            "pt_br": {
                "name":"",
                "nationality":"",
                "graduation":"",
                "portuguese":"",
                "english":"",
                "linkedin":"",
                "github":"",
                "youtube":"",
                "instagram":""
            },
            "en_us": {
                "name":"",
                "nationality":"",
                "graduation":"",
                "portuguese":"",
                "english":"",
                "linkedin":"",
                "github":"",
                "youtube":"",
                "instagram":""
            },
        }
    });
    const [intro,setIntro] = useState({
        "content":{
            "pt_br": {
                "about":""
            },
            "en_us": {
                "about":""
            },
        }
    });
    const loadAbout = async () => {
        await PrivateApi.get('/profile/')
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            updateData.cover = result.data.response[0].cover;
            setAbout(updateData);
        })
        .catch(()=>{
        });
    };
    const loadIntro = async () => {
        await PrivateApi.get('/intro/')
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            setIntro(updateData);
        })
        .catch(()=>{
        });
    };
    const loadSkills = async () => {
        await PrivateApi.get('/stack-tree/')
        .then((result)=>{
            let parsed = parseContentRecursively(result.data.response);
            setSkills(parsed);
        })
        .catch(()=>{
        });
    };
    useEffect( () => {
        loadSkills();
        loadAbout();
        loadIntro();
    },[]);

    return(
        <div id="about" className="section about">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <span className="title">{translation.landing.about.title}</span>
                            <span className="subtitle">{translation.landing.about.subtitle}</span>
                            <span className="description">{translation.landing.about.description}</span>
                        </div>
                    </div>
                </div>
                <div className="row auto_height">
                    <div className="col-md-4">
                        <div className="me auto_height_item">
                            <div className="avatar" style={{ backgroundImage: `url(${about.cover})`}}>
                            </div>
                            <span className="name">{about.content[translation.code].name}</span>
                            <div className="details">
                                {translation.landing.me.info.map( (info,i) =>
                                    <div key={i} className="detail">
                                        <strong>{info.name}</strong>
                                        <span>{about.content[translation.code][info.slug]}</span>
                                    </div>
                                )}
                            </div>
                            <span className="name">{translation.landing.me.titlecontact}</span>
                            <div className="details">
                                {translation.landing.me.social.map( (network,i) =>
                                    <div key={i} className="detail">
                                    <strong><i className={network.icon}></i></strong>
                                    <span>{network.link}</span>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-8">
                        <div className="box">
                            <details open="open">
                                <summary className="box-title">
                                    <i className="lni lni-user"></i>
                                    <span>{translation.landing.about.title}</span>
                                    <i className="summary-arrow lni lni-chevron-down"></i>
                                </summary>
                                <div className="box-content">
                                    <div className="list-badges-item">
                                        <span className="description">
                                        {intro.content[translation.code].about.split('\n').map((line, i) => (
                                            <span key={i}>
                                            {line}
                                            <br/>
                                            </span>
                                        ))}<br/>
                                        </span>
                                    </div>
                                </div>
                            </details>
                        </div>
                        {skills && Object.entries(skills).map(([key, top],i) => (
                            <div className="box" key={key}>
                                <details open="open">
                                    <summary className="box-title">
                                        <i className={top.icon}></i>
                                        <span>{top.content[translation.code].title}</span>
                                        <i className="summary-arrow lni lni-chevron-down"></i>
                                    </summary>
                                    <div className="box-content">
                                    {top.list && Object.entries(top.list).map(([subkey, skillWrapper]) => {
                                        const skill = getInnerObject(skillWrapper);
                                        return (
                                            <div key={subkey} className="list-badges top-level">
                                            <div className="list-badges-item">
                                                <div className="info">
                                                <div className="name">
                                                    <span style={{ borderColor: skill.color }}>
                                                    {skill.content?.[translation.code]?.title || 'Sem título'}
                                                    </span>
                                                </div>
                                                {skill.content[translation.code].subtitle &&
                                                    <strong>{skill.content?.[translation.code]?.subtitle}</strong>
                                                }
                                                {skill.content[translation.code].description &&
                                                    <span className="description">
                                                        {skill.content[translation.code].description}
                                                    </span>
                                                }
                                                </div>
                                                {skill.list && Object.entries(skill.list).map(([key, subSkillWrapper]) => {
                                                    const subSkill = getInnerObject(subSkillWrapper);
                                                    return (
                                                        <div key={key} className="list-badges">
                                                        <div className="list-badges-item">
                                                            <div className="info">
                                                            <div className="name">
                                                                <span style={{ borderColor: subSkill.color }}>
                                                                    {subSkill.content?.[translation.code]?.title || 'Sem título'}
                                                                </span>
                                                            </div>
                                                            {subSkill.content[translation.code].subtitle &&
                                                                <strong>{subSkill.content?.[translation.code]?.subtitle}</strong>
                                                            }
                                                            {subSkill.content[translation.code].description &&
                                                                <span className="description">
                                                                    {subSkill.content[translation.code].description}
                                                                </span>
                                                            }
                                                            </div>
                                                        </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            </div>
                                        );
                                        })}

                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <LoadingComponent name={`${translation.landing.loading}...`} status={loading}/>
                        <ReturnComponent type="error" list={error}/>
                    </div>
                </div>
            </div>
        </div>
    );

}