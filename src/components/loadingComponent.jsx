export default function LoadingComponent(props) {

    return(
        <>
            {props.status &&
                <div className="loading">
                    <i className="lni lni-spinner-solid"></i>
                    <span>{props.name}</span>
                </div>
            }
            {props.break && props.status && 
                <div className="break">
                    <br/>
                </div>
            }
        </>
    );

};