import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import LandingPagination from "./landingPagination";
import { PublicApiGet } from "../../../api/publicApi";
import LoadingComponent from "../../../components/loadingComponent";
import ReturnComponent from "../../../components/returnComponent";
import { parseContentRecursively } from "../../../utils/utils";
import { PrivateApi } from "../../../panel/api/privateApi";
import ModalComponent from "../../../components/modalComponent";

export default function LandingProjectsResume() {
    
    // Defaults

        const {translation} = useContext(AppContext);

    // Pagination
        
        const [paginationTotal,setPaginationTotal] = useState(1);
        const [paginationActual,setPaginationActual] = useState(1);
        const changePagination = (id) => {
            setPaginationActual(id);
            setProjects([]);
            getProjects(activeCategory,id);
        };
    
    // Category

        const [activeCategory,setActiveCategory] = useState(null);
        const changeCategory = (id) => {
            setActiveCategory(id);
            setPaginationActual(1);
            setProjects([]);
            getProjects(id,1);
        };
        const [categories,setCategories] = useState([]);
        const [loadingCategories,setLoadingCategories] = useState(false);
        const [errorCategories,setErrorCategories] = useState([]);

    // Projects

        const [projects,setProjects] = useState([]);
        const [loadingProjects,setLoadingProjects] = useState(false);
        const [errorProjects,setErrorProjects] = useState([]);
        const getProjects = (category="",page="")=> {
            setPaginationTotal(0);
            PublicApiGet({
                setUrl: 'projects',
                setParams: {category: category,page: page,limit: '99'},
                setData: ()=>{},
                setLoader: setLoadingProjects,
                setError: setErrorProjects,
                setCallback: (payload) => {
                    let updateData = [];
                    for (let i = 0; i < payload.response.length; i++) {
                        let item = payload.response[i];
                        if( JSON.parse(item.content) ){
                            item.content = JSON.parse(item.content);
                        }
                        updateData.push(item);
                    }
                    setProjects(updateData);
                    setPaginationTotal(payload.records.pages);
                }
            });
        };
        const getCategories = async () => {
            await PrivateApi.get('/projects-categories/')
            .then((result)=>{
                let parsed = parseContentRecursively(result.data.response);
                setCategories(parsed);
            })
            .catch(()=>{
            });
        };

    // See project
        const [project,setProject] = useState({
            "content":{
                "pt_br": {
                },
                "en_us": {
                },
            }
        });
        const [loadingProject,setLoadingProject] = useState(false);
        const [errorProject,setErrorProject] = useState([]);
        const getProject = async (id="")=> {
            setLoadingProject(true);
            await PrivateApi.get('projects/'+id)
            .then((result)=>{
                let updateData = {};
                if( JSON.parse(result.data.response[0].content) ){
                    updateData.content = JSON.parse(result.data.response[0].content);
                }
                updateData.code = result.data.response[0].code;
                updateData.cover = result.data.response[0].cover;
                setProject(updateData);
                setLoadingProject(false);
            })
            .catch((e)=>{
                setErrorProject(["Erro ao carregar informações!"]);
                setLoadingProject(false);
            });
            setShowModal(true);
        };
        const [showModal, setShowModal] = useState(false);
        const closeModal = () => setShowModal(false);
        const SeeProject = ({ project }) => {
            return(
                <>
                    {projects.length >= 1 &&
                        <div className="list-projects">
                            <div className="project project-intern">
                                <div className="row">
                                    {!project.content[translation.code].video && project.cover &&
                                        <div className="col-md-12">
                                            <div className="cover">
                                                <img src={project.cover}/>
                                            </div>
                                        </div>
                                    }
                                    {project.content[translation.code].video &&
                                        <div className="col-md-12">
                                            <div className="video">
                                                <iframe src={project.content[translation.code].video} frameborder="0"></iframe>
                                            </div>
                                        </div>
                                    }
                                    <div className="col-md-12">
                                        <div className="content">
                                            <span className="title">{project.content[translation.code].title}</span>
                                            <div className="badges">
                                                {project.code === "1" &&
                                                    <span className="code"><i className="lni lni-unlock"></i> {translation.landing.projects.code_open}</span>
                                                }
                                                {project.code === "2" &&
                                                    <span className="code"><i className="lni lni-lock"></i> {translation.landing.projects.code_closed}</span>
                                                }
                                            </div>
                                            <span className="description">
                                                {project.content[translation.code].content.split('\n').map((line, i) => (
                                                    <span key={i}>
                                                    {line}
                                                    <br/>
                                                    </span>
                                                ))}<br/>
                                            </span>
                                            <div className="link">
                                                {project.content[translation.code].url_code &&
                                                    <a href={project.content[translation.code].url} target="_blank"><i className="lni lni-github"></i> {translation.landing.projects.check_code}</a>
                                                }
                                                {project.content[translation.code].url &&
                                                    <a href={project.content[translation.code].url} target="_blank"><i className="lni lni-world"></i> {translation.landing.projects.check_online}</a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <LoadingComponent break="true" name={`${translation.landing.loading}...`} status={loadingProject}/>
                    <ReturnComponent type="error" list={errorProject}/>
                </>
            );
        };

    useEffect(() => {
        getCategories();
        getProjects(activeCategory,paginationActual);
    },[]);

    return(
        <>
            <ModalComponent show={showModal} toggle={closeModal}>
                <SeeProject project={project}/>
            </ModalComponent>
            <div id="projects" className="section projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <span className="title">{translation.landing.projects.title}</span>
                                <span className="subtitle">{translation.landing.projects.subtitle}</span>
                                <span className="description">{translation.landing.projects.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {projects.length >= 1 &&
                                <div className="row list-projects">
                                    {projects.map((project,i) =>
                                        <div key={i} className="project col-md-6" onClick={(e)=>getProject(project._id)}>
                                            <div className="row straight">
                                                <div className="col-md-3">
                                                    <div className="cover">
                                                        <img src={project.cover}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="content">
                                                        <span className="title">{project.content[translation.code].title}</span>
                                                        <span className="description">{project.content[translation.code].excerpt}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                            <LoadingComponent break="true" name={`${translation.landing.loading}...`} status={loadingProjects}/>
                            <ReturnComponent type="error" list={errorProjects}/>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );

}