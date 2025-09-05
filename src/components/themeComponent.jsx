import React, { useContext } from "react"
import { ButtonGroup, Nav, Navbar } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { AppContext } from "../context/AppContext/AppContext";

export default function ThemeComponent() {

    const{translation,theme,toggleTheme} = useContext(AppContext);

    return(
        <div className="toggle-bar toggle-theme">
            <span>{translation.landing.theme}:</span>
            <ButtonGroup title={translation.landing.changeTheme}>
                <ToggleButton className={(theme == 'light') ? 'toggle-button active':'toggle-button'} type="checkbox" checked={theme == 'light'} value="light" onClick={toggleTheme} ><i className="lni lni-sun"></i></ToggleButton>
                <ToggleButton className={(theme == 'dark') ? 'toggle-button active':'toggle-button'} type="checkbox" checked={theme == 'dark'} value="dark" onClick={toggleTheme} ><i className="lni lni-night"></i></ToggleButton>
            </ButtonGroup>
        </div>
    );

};

