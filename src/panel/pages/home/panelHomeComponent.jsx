import PanelUp from "../../components/templates/panelUp";
import PanelBottom from "../../components/templates/panelBottom";
import PanelBreadcrumb from "../../components/templates/panelBreadcrumb";

export default function PanelHomeComponent() {

    return(

        <div className="panel">
        <PanelUp/>
        <div className="panel-middle">
            <PanelBreadcrumb
            content={{
                "title":"Bem vindo",
                "list":[
                    {'title':'Panel','href':'/panel','active':''}
                ]
            }}
            />
        </div>
        <PanelBottom/>
    </div>
    );

}