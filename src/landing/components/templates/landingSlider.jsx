import React from "react";
import Slider from "react-slick";

export default function LandingSlider(props) {

const PrevArrow = (props) => {
        const { onClick } = props;
        return(
            <i className='arrow arrow-prev lni lni-chevron-left' onClick={onClick}></i>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return(
            <i className='arrow arrow-next lni lni-chevron-right' onClick={onClick}></i>
        );
    };

    const slick = {
        className: props.name,
        centerMode: false,
        infinite: false,
        centerPadding: "0",
        slidesToShow: screen.width > 980 ? 3:1,
        speed: 500,
        arrows: true,
        dots: true,
        accessibility: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3
                }
            },
            {
                breakpoint: 980,
                settings: {
                slidesToShow: 1
                }
            }
        ],
    nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };

    return( 
        <Slider className={props.name} {...slick}>
            {props.children}
        </Slider>
    );

};