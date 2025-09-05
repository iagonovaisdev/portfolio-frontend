import React, { useContext } from "react"
import { ButtonGroup, Nav, Navbar } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { AppContext } from "../context/AppContext/AppContext";

export default function LanguageComponent() {

    const{translation,toggleTranslation} = useContext(AppContext);

    return(
        <div className="toggle-bar toggle-language">
            <span>{translation.landing.language}:</span>
            <ButtonGroup title={translation.landing.changeLanguage}>
                <ToggleButton className={(translation.code == 'pt_br') ? 'toggle-button active':'toggle-button'} type="checkbox" checked={translation.code == 'pt_br'} value="pt_br" onClick={toggleTranslation} >PT-BR</ToggleButton>
                <ToggleButton className={(translation.code == 'en_us') ? 'toggle-button active':'toggle-button'} type="checkbox" checked={translation.code == 'en_us'} value="en_us" onClick={toggleTranslation} >EN-US</ToggleButton>
            </ButtonGroup>
        </div>
    );

};

