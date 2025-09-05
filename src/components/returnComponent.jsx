export default function ReturnComponent(props) {

    const icon = props.type == 'error' ? 'lni lni-close':'lni lni-checkmark'

    return(
        <>
            {props.list.length >= 1 &&
                <div className="returner">
                    <div className="error">
                        {props.list.map((error,i) =>
                            <span key={i}><i className={icon}></i> {error}</span>
                        )}
                    </div>
                </div>
            }
        </>
    );

};