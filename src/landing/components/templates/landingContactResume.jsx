import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import { PublicApiGet } from "../../../api/publicApi";
import { useEffect } from "react";

export default function LandingContact() {

    const {translation} = useContext(AppContext);

    const [contactLink,setContactLink] = useState("mailto:iagonovaisdev@gmail.com");
    const [contact,setContact] = useState({});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [form,setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleForm = (el) => {
        setForm({...form,[el.name]:el.value});
    };

    useEffect(() => {
        const link = `mailto:iagonovaisdev@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`${form.message}\n\nPor: ${form.name} (${form.email} - ${form.phone})`)}`;
        setContactLink(link);
    }, [form]);

    return(
        <div id="contact" className="section contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title">
                            <span className="title">{translation.landing.contact.subtitle}</span>
                            <span className="subtitle">{translation.landing.contact.subtitle}</span>
                            <span className="description">{translation.landing.contact.description}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="me">
                            <div className="details">
                                {translation.landing.me.contact.map( (info,i) =>
                                    <div key={i} className="detail">
                                        <strong><i className={info.icon}></i></strong>
                                        <span>{info.text}</span>
                                    </div>
                                )}
                                {translation.landing.me.social.map( (network,i) =>
                                    <div key={i} className="detail">
                                    <strong><i className={network.icon}></i></strong>
                                    <span>{network.link}</span>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    );

}