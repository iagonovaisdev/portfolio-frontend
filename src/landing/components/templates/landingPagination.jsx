import React,{useEffect, useState} from "react";

export default function LandingPagination(props) {

    const {actual,setActual,total} = props;

    const prev = () => {
        let updatePage = actual > 1 ? actual-1:1;
        setActual(updatePage);
    };

    const next = () => {
        let updatePage = actual > total ? total:actual+1;
        setActual(updatePage);
    };

    const number = (number) => {
        setActual(number);
    };

    const listPages = () => {
        let renderPages = [];
        for(let i=0;i<total;i++) {
            renderPages.push(i+1);
        };
        return renderPages;
    };

    useEffect(()=> {
    },[]);

    return(
        <>
            {total >= 1 &&
                <div className="pagination">
                    {actual > 1 && <a onClick={prev} className="item arrow prev"><i className="lni lni-chevron-left"></i></a>}
                    {listPages().map((page) =>
                        <div key={page} onClick={()=>number(page)} className={`item page ${actual == page ? 'active':''}`}>{page}</div>
                    )}
                    {actual < total && <a onClick={next} className="item arrow next"><i className="lni lni-chevron-right"></i></a>}
                </div>
            }
        </>
    );

}