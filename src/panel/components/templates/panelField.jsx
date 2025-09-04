/* eslint-disable react/prop-types */
export default function PanelField(props){

    return(
        <>
            <div className="panel-field">
                {props.label && 
                    <label htmlFor={props.name}>{props.label}</label>
                }
                {props.type==='text' &&
                    <input onChange={(e)=>{props.handleData(props.language,e)}} type="text" name={props.name} value={props.value}/>
                }
                {props.type==='textarea' &&
                    <textarea onChange={(e)=>{props.handleData(props.language,e)}} name={props.name} value={props.value}></textarea>
                }
                {props.type==='select' &&
                    <select value={props.defaultValue} onChange={(e)=>{props.handleData(props.language,e)}} name={props.name}>      
                        <option value=""></option>          
                        {props.value.length >= 1 && props.value.map((item,i)=>
                            <option key={i} value={item._id}>{item.content.pt_br.title}</option>
                        )}
                    </select>
                }
                {props.type==='submit' &&
                    <button onClick={props.submit} name={props.name}>
                        {!props.loader && <span>{props.value}</span>}
                        {props.loader && <i className="lni lni-spinner-solid"></i>}
                    </button>
                }
            </div>
        </>
    );

}