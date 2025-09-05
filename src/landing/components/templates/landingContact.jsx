import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import { PublicApiGet } from "../../../api/publicApi";
import { useEffect } from "react";

export default function LandingContact() {

    const {translation} = useContext(AppContext);

    const [contactLink,setContactLink] = useState("mailto:contato@iagonovais.dev");
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
        const link = `mailto:contato@iagonovais.dev?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`${form.message}\n\nPor: ${form.name} (${form.email} - ${form.phone})`)}`;
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
                    <div className="col-md-4">
                        <div className="me">
                            <div className="details">
                                {translation.landing.me.contact.map( (info,i) =>
                                    <div key={i} className="detail">
                                        <strong><i className={info.icon}></i></strong>
                                        <span>{info.text}</span>
                                    </div>
                                )}
                            </div>
                            <div className="social">
                                {translation.landing.me.social.map( (network,i) =>
                                    <a key={i} title={network.name} href={network.link} target="_blank"><i className={network.icon}></i></a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="contact-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="contact-field">
                                        <input type="text" onChange={(e)=>handleForm(e.target)} name="name" placeholder={`${translation.landing.contact.fields.name}:`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="contact-field">
                                        <input type="text" onChange={(e)=>handleForm(e.target)} name="email" placeholder={`${translation.landing.contact.fields.email}:`}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="contact-field">
                                        <input type="text" onChange={(e)=>handleForm(e.target)} name="telefone" placeholder={`${translation.landing.contact.fields.phone}:`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="contact-field">
                                        <input type="text" onChange={(e)=>handleForm(e.target)} name="subject" placeholder={`${translation.landing.contact.fields.subject}:`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="contact-field">
                                        <textarea name="message" onChange={(e)=>handleForm(e.target)} placeholder={`${translation.landing.contact.fields.message}:`}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="contact-field">
                                        <a href={contactLink} target="_blank">
                                            <i className='lni lni-send'></i>
                                            {translation.landing.contact.fields.send}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}