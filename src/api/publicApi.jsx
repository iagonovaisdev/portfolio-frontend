import axios from 'axios';

export const PublicApi = axios.create({
    // baseURL: "http://localhost:3001/api"
    baseURL: "/api"
});

export const PublicApiGet = async (props) => {

    if(!props.setUrl) {throw new Error("You have to define the setUrl");};
    if(!props.setData) {throw new Error("You have to define the setData");};
    if(!props.setLoader) {throw new Error("You have to define the setLoader");};
    if(!props.setError) {throw new Error("You have to define the setError");};
        
    props.setLoader(true);
    setTimeout(()=>{
        PublicApi.get(props.setUrl, {
            params: props.setParams
        })
        .then(function(payload) {
            if( payload.data.result == 1 ) {
                props.setData(payload.data.response);
                props.setError([]);
                if(props.afterLoad){
                    props.afterLoad();
                };
            } else {
                props.setData([]);
                props.setError(["Erro ao carregar informações!"]);
            }
            props.setLoader(false);
            if(props.setCallback) {
                props.setCallback(payload.data);
            };
        })
        .catch(function (error) {
            props.setData([]);
            props.setError(["Erro ao carregar informações!"]);
            props.setLoader(false);
        });
    },1500);

};