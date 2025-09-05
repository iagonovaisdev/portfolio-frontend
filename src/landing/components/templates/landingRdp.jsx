import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";

export default function LandingRdp() {

    const {translation} = useContext(AppContext);

    return(
        <div className="rdp">
            <span>{translation.landing.rdp.title}</span>
        </div>
    );

}