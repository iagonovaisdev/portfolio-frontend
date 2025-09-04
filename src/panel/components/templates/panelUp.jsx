import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/authContext/authContext';
import { AppContext } from '../../../context/AppContext/AppContext';
import ThemeComponent from '../../../components/themeComponent';
import LanguageComponent from '../../../components/languageComponent';
import { Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";

export default function PanelUp(){

    const { auth,logout } = useContext(AuthContext);
    const { translation } = useContext(AppContext);

    const [menu,setMenu] = useState(false);
    const [userMenu,setUserMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const toggleUserMenu = () => {
        setUserMenu(!userMenu);
    };

    return(
        <div className="panel-up">
            <div className="panel-top">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-4 col-md-4 d-md-none">
                            <div className="toggle menu-toggle">
                                <i onClick={toggleMenu} className="lni lni-menu"></i>
                            </div>
                        </div>
                        <div className="col col-xs-4 col-md-4">
                            <div className="logo">
                                <a href="">
                                    <span className="name">Iago<strong>_</strong></span>
                                </a>
                            </div>
                        </div>
                        <div className="col col-xs-4 col-md-8">
                            <div className="panel-user d-none d-md-block d-lg-block">
                                <span className="email"><i className="lni lni-user"></i> {auth.email}</span>
                                <a href="/panel/config" className="config"><i className="lni lni-cog"></i></a>
                                <a onClick={logout} href="#" className="logout"><i className="lni lni-power-switch"></i></a>
                            </div>
                            <div className="toggle user-toggle d-md-none">
                                <i onClick={toggleUserMenu} className="lni lni-cog"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel-menu d-none d-md-block d-lg-block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="menu">
                                <Navbar expand='lg'>
                                    <Navbar.Offcanvas show={menu} onHide={()=>setMenu(false)} id="menu-sidebar">
                                        <Offcanvas.Header closeButton closeVariant="white">
                                            <Offcanvas.Title id='menu-sidebar'>
                                                Menu
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <Nav>
                                                {translation.panel.menu.map( (menu,i) =>
                                                    !menu.list ? ( 
                                                        <Nav.Link className="nav-linker active" key={i} href={menu.path}>{menu.title}</Nav.Link> 
                                                    ):(
                                                        <NavDropdown title={menu.title} key={i}>
                                                            {menu.list.map( (submenu,i) =>
                                                                <NavDropdown.Item key={i} href={submenu.path}><i className={submenu.icon}></i> {submenu.title}</NavDropdown.Item>
                                                            )}
                                                        </NavDropdown>
                                                    )
                                                )}    
                                                <div className="top-bar d-md-none d-lg-none">
                                                    <ThemeComponent/>
                                                </div>  
                                            </Nav>
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </Navbar>
                            </div>
                            <div className="user-menu d-none d-xs-block">
                                <Navbar expand='lg'>
                                    <Navbar.Offcanvas show={userMenu} onHide={()=>setUserMenu(false)} placement="end" id="usermenu-sidebar">
                                        <Offcanvas.Header closeButton closeVariant="white">
                                            <Offcanvas.Title id='usermenu-sidebar'>
                                                Usuário
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <span><i className="lni lni-user"></i>{auth.email}</span>
                                            <Nav>
                                                <Nav.Link className="nav-linker" href="/panel/config"><i className="lni lni-cog"></i> Configurações</Nav.Link>
                                                <Nav.Link className="nav-linker" href="/panel/logout"><i className="lni lni-power-switch"></i> Sair</Nav.Link>
                                            </Nav>
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </Navbar>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="panel-toggle">
                                <ThemeComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};