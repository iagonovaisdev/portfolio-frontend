import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";

export default function LandingMore() {

    const {translation} = useContext(AppContext);

    return(
        <div id="more" className="section-bg more">
            <div className="bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <span className="title">{translation.landing.more.title}</span>
                                <span className="subtitle">{translation.landing.more.subtitle}</span>
                                <span className="description">{translation.landing.more.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row list-numbers">
                        {translation.landing.more.list.map((number,i) =>
                            <div key={i} className="col-md-4">
                                <div className="number">
                                    <i className={number.icon}></i>
                                    <span className="data">{number.data}</span>
                                    <span className="name">{number.name}</span>
                                    <div className="link">
                                        <a href={number.link} target="_blank">Acessar <i className="lni lni-enter"></i></a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}