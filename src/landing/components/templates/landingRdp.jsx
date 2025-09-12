import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";

export default function LandingRdp() {

    const {translation} = useContext(AppContext);

    return(
        <div className="rdp">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span>{translation.landing.rdp.title}</span>
                    </div>
                </div>
            </div>
        </div>
    );

}