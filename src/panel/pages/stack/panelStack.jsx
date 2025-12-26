import { useContext, useEffect, useState } from 'react';
import '../../styles/style.scss';

import Sortable from 'sortablejs';
import PanelUp from '../../components/templates/panelUp';
import PanelBreadcrumb from '../../components/templates/panelBreadcrumb';
import PanelBottom from '../../components/templates/panelBottom';
import ReturnComponent from '../../../components/returnComponent';
import LandingPagination from "../../../landing/components/templates/landingPagination";
import { AppContext } from '../../../context/AppContext/AppContext';
import { PrivateApi } from '../../api/privateApi';
import { AuthContext } from '../../context/authContext/authContext';

export default function PanelStack() {

    const { translation } = useContext(AppContext);

    const {auth} = useContext(AuthContext);

    const [data,setData] = useState([]);
    const [callback,setCallback] = useState({
        type: '',
        msg: []
    });
    const [ordering,setOrdering] = useState(false);

    const [paginationTotal,setPaginationTotal] = useState(1);
    const [paginationActual,setPaginationActual] = useState(1);
    const changePagination = (id) => {
        setPaginationActual(id);
        setData([]);
        getData(paginationActual);
    };

    const getData = (limit = 15) => {
        PrivateApi.get('/stack?page='+paginationActual+'&limit='+limit).then((result)=>{
            let newData = [];
            result.data.response.map((item)=>{
                let newItem = {};
                if( JSON.parse(item.content) ) { 
                    newItem.content = JSON.parse(item.content);
                }
                newItem.id = item._id;
                newData.push(newItem); 
                setPaginationTotal(result.data.records.pages);
            });
            setData(newData);
        }).catch(()=>{
            console.log("erro");
        });
    };

    const deleteData = (id) => {
        if( confirm('Tem certeza que deseja deletar esse item?') ) {
            PrivateApi.delete('/stack/'+id,{
                headers: {
                    'authorization': auth.token
                }
            }).then(()=>{
                setCallback({
                    'type': 'success',
                    'msg': ['Deletado com sucesso']
                });
                getData();
            }).catch((error)=>{
                console.log(error);
                setCallback({
                    'type': 'error',
                    'msg': ['Erro ao deletar']
                });
            });
        }

    };

    const reorder = () => {
        setOrdering(!ordering);
    };

    useEffect(()=>{

        getData();

        const sortableParent = document.querySelector(".sortable tbody");
        const sortableChildren = "tr";
        Sortable.create(sortableParent,{
            handle: '.lni-move',
            animation: 150,
            onEnd: () => {
                
                let reindex = sortableParent.querySelectorAll(sortableChildren);
                let newOrder = [];
                let actual = 0;
                for(let item of reindex) {
                    let newItem = {'id':item.id,'order':actual};
                    newOrder.push(newItem);
                    actual++;
                }
                console.log(newOrder);

                PrivateApi.put('/stack/reorder/',{'order':newOrder},{
                    headers: {
                        'authorization': auth.token
                    }
                })
                .then((result)=>{
                    console.log("Reordered "+result);
                }).catch(()=>{
                    console.log("Error to reorder");
                });

            }
        })

    },[setData]);

    return(
        <>  
            <div className="panel">
                <PanelUp/>
                <div className="panel-middle">
                    <PanelBreadcrumb
                    content={{
                        "title":"Stack",
                        "list":[
                            {'title':'Painel','href':'/control','active':''},
                            {'title':'Stack','href':'/control/stack','active':'true'}
                        ]
                    }}
                    />

                    <div className="panel-content">
                        <div className="container">

                            <div className="row flex flex-middle">
                                <div className="col-md-6">
                                    <h1 className="panel-content-title">
                                        Stacks
                                    </h1>
                                </div>
                                <div className="col-md-6">
                                    <span onClick={reorder} className={`panel-content-button ${!ordering ? 'panel-content-button-disabled':''} float-right`}>
                                        Reordenar <i className="lni lni-list"></i>
                                    </span>
                                    <a href="/panel/stack/add" className="panel-content-button float-right">
                                        Adicionar <i className="lni lni-plus"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {callback.msg && <ReturnComponent type={callback.type} list={callback.msg}/>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <table id="sortable" className='tabled sortable'>
                                        <thead>
                                            <tr>
                                                {ordering && <th></th>}
                                                <th>Título</th>
                                                <th>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item,i) =>
                                                <tr id={item.id} key={i}>
                                                    {ordering && <td><i className="lni lni-move"></i></td>}
                                                    <td>{item.content[translation.code].title}</td>
                                                    <td>
                                                        <div className="tabled-actions float-right">
                                                            <a title="Editar" href={`/control/stack/edit/${item.id}`}><i className="lni lni-pencil"></i></a>
                                                            <a title="Deletar" onClick={()=>deleteData(item.id)}  href="#"><i className="lni lni-trash-can"></i></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <LandingPagination 
                                    total={paginationTotal} 
                                    setTotal={setPaginationTotal} 
                                    actual={paginationActual} 
                                    setActual={changePagination}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <PanelBottom/>
            </div>
        </>
    );

}