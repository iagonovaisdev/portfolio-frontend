import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import language_pt_br from '../../languages/pt_br.json';
import language_en_us from '../../languages/en_us.json';
import theme_dark from '../../themes/dark.json';
import theme_light from '../../themes/light.json';
import ModalComponent from "../../components/modalComponent";
import ThemeComponent from "../../components/themeComponent";
import LanguageComponent from "../../components/languageComponent";

export default function AppContextProvider(props) {

    // Translation

        const [translation,setTranslation] = useState(language_pt_br);
        const toggleTranslation = () => {
            if( translation.code == 'pt_br' ) { 
                setTranslation(language_en_us);
                localStorage.setItem("translation","en_us");
            } else { 
                setTranslation(language_pt_br); 
                localStorage.setItem("translation","pt_br");
            }
        };
        const getTranslation = () => {
            if( !localStorage.getItem("translation") || localStorage.getItem("translation") == 'pt_br' ) { 
                setTranslation(language_pt_br);
                localStorage.setItem("translation","pt_br");
            } else { 
                setTranslation(language_en_us); 
                localStorage.setItem("translation","en_us");
            }
        };

    // Theme

        const [theme,setTheme] = useState( localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark" );
        const toggleTheme = () => {
            if( theme == 'dark' ) { 
                setTheme("light"); 
                localStorage.setItem("theme","light");
            } else { 
                setTheme("dark"); 
                localStorage.setItem("theme","dark");
            }
        };

        const getTheme = () => {
            let actualTheme = null;
            actualTheme = ( theme == 'dark' ) ? theme_dark : theme_light;
            const root = document.querySelector(':root');
            actualTheme.map( (style) => {
                root.style.setProperty(style.variable,style.value);
            } );
        };

    // Welcome

        const [welcome,setWelcome] = useState(localStorage.getItem('welcome') ? false:true);
        const toggleWelcome = () => {
            localStorage.setItem('welcome',false);
            setWelcome(!welcome);
        };
        const WelcomeComponent = () => {
            return(
                <div className="welcome section-bg">
                    <div className="bg">
                        <h1>{translation.landing.choose_language}</h1>
                        <LanguageComponent/>
                        <p>{translation.landing.cookies}</p>
                        <button onClick={toggleWelcome}>
                            <i className="lni lni-checkmark"></i>
                            {translation.landing.accept}
                        </button>
                    </div>
                </div>
            );
        };

    useEffect(()=> {
        getTheme();
        getTranslation();
    },[theme,translation,welcome]);

    return(
        <>
            <AppContext.Provider value={{
                translation,
                toggleTranslation,
                theme,
                toggleTheme
                }}>
                <ModalComponent show={welcome} toggle={toggleWelcome}>
                    <WelcomeComponent/>
                </ModalComponent>
                <div className={`theme theme-${theme}`}>
                    {props.children}
                </div>
            </AppContext.Provider>
        </>
    );

};