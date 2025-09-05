import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import LandingSlider from "./landingSlider";
import LoadingComponent from "../../../components/loadingComponent";
import ReturnComponent from "../../../components/returnComponent";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingRoadmap() {

    const {translation} = useContext(AppContext);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const [trajectory,setTrajectory] = useState([]);

    const loadData = async () => {
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
        loadData();
    },[] );

    return(
        <div id="roadmap" className="section-bg roadmap">
            <div className="bg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <span className="title">{translation.landing.roadmap.title}</span>
                            <span className="subtitle">{translation.landing.roadmap.subtitle}</span>
                            <span className="description">{translation.landing.roadmap.description}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 auto_height">
                        {trajectory.length >= 1 &&
                            <LandingSlider name='slickRoadMap'>
                                { trajectory.map( (road,i) => 
                                    <div key={i} className="slick-slider-item">
                                        <div className="slick-slider-item-holder auto_height_item">
                                            <span className="text">{road.content[translation.code].description}</span>
                                            <span className="title">{road.year}</span>
                                            <span className="titlebig">{road.year}</span>
                                        </div>
                                    </div>
                                )}
                            </LandingSlider>
                        }
                    </div>
                </div>
                <LoadingComponent name={`${translation.landing.loading}...`} status={loading}/>
                <ReturnComponent type="error" list={error}/>
            </div>
        </div>
    );

};