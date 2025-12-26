import { useContext } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { AppContext } from "../../../context/AppContext/AppContext";

export default function panelBreadcrumb(props) {

    const {translation} = useContext(AppContext);

    return(
        <div className="panel-breadcrumb">
            <div className="bg">
                {props.content.title && <h1>{props.content.title}</h1>}
                <Breadcrumb>
                    <Breadcrumb.Item href="/control/"><i className="lni lni-home"></i></Breadcrumb.Item>
                    {props.content.list && props.content.list.map( (item,i) =>
                        item.active == "true" ? (
                            <Breadcrumb.Item key={i} active>{item.title}</Breadcrumb.Item>
                        ):(
                            <Breadcrumb.Item key={i} href={item.href}>{item.title}</Breadcrumb.Item>
                        )
                    )}
                </Breadcrumb>
            </div>
        </div>
    );

};