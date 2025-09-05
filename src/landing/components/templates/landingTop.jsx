import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext/AppContext';
import { Utils_sticky,Utils_scrollspy } from "../../../utils/utils";
import { Nav, Navbar } from 'react-bootstrap';
import ThemeComponent from '../../../components/themeComponent';
import LanguageComponent from '../../../components/languageComponent';

export default function LandingTop() {

    const {translation} = useContext(AppContext);
    
    const [activeSection,setActiveSection] = useState('about');
    const updateSection = (section) => {
        setActiveSection(section);
    };

    useEffect( ()=>{
        Utils_sticky();
        Utils_scrollspy(['about','roadmap','experience','practice','projects','contact'],updateSection,150);
    },[] );

    return (
        <>
            <div className="top sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-4">
                            <a href="#home">
                                <div className="top-logo d-none d-md-block d-lg-block">
                                    <span className="name">Iago Novais <strong>_</strong></span>
                                    <span className="description">{translation.landing.logo.description}</span>
                                </div>
                                <div className="top-logo top-logo-min d-md-none d-lg-none">
                                    <span className="name">In <strong>_</strong></span>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="top-menu">
                                <Navbar expand='lg'>
                                    <Navbar.Toggle aria-controls="landing-menu" />
                                    <Navbar.Collapse id="landing-menu">
                                        <Nav>
                                            {translation.landing.menu.map( (menu,i) =>
                                                <Nav.Link key={i} className={ activeSection == menu.id ? 'active':'' } href={`#${menu.id}`}>{menu.title}</Nav.Link>
                                            )}    
                                            <div className="top-bar d-md-none d-lg-none">
                                                <ThemeComponent/>
                                                <LanguageComponent/>
                                            </div>  
                                        </Nav>
                                    </Navbar.Collapse>
                                </Navbar>
                            </div>
                        </div>
                        <div className="col-md-3 d-none d-md-block d-lg-block">
                            <div className="top-bar">
                                <ThemeComponent/>
                                <LanguageComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}