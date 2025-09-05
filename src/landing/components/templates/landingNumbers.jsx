import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext/AppContext";
import { PrivateApi } from "../../../panel/api/privateApi";

export default function LandingNumbers() {

    const {translation} = useContext(AppContext);
    const [data,setData] = useState({
        "content":{
            "pt_br": {
            },
            "en_us": {
            },
        }
    });

    const loadNumbers = async () => {
        await PrivateApi.get('/numbers/')
        .then((result)=>{
            let updateData = {};
            if( JSON.parse(result.data.response[0].content) ){
                updateData.content = JSON.parse(result.data.response[0].content);
            }
            setData(updateData);
        })
        .catch(()=>{
        });
    };
    useEffect( () => {
        loadNumbers();
    },[]);

    return(
        <div id="numbers" className="section-bg numbers">
            <div className="bg">
                <div className="container">
                    <div className="row list-numbers">
                        {translation.landing.numbers.map((number,i) =>
                            <div key={i} className="col-md-4">
                                <div className="number">
                                    <i className={number.icon}></i>
                                    <span className="data">{number.subtitle} {data.content[translation.code][number.slug]} {number.description}</span>
                                    <span className="name">{number.title}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}