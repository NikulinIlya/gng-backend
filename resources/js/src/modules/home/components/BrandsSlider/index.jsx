import React, { useState, useEffect, useRef } from "react";
import IconButton from "@/components/IconButton";

import prevIcon from "@/assets/images/icons/arrow-prev.svg";
import nextIcon from "@/assets/images/icons/arrow-next.svg";

import brands from "@/modules/brands/static";

import "./brands-slider.scss";

export default function BrandsSlider() {
    const sliderRef = useRef(null);
    const onNext = _ => {
        const { current: slider } = sliderRef;
        console.log(slider.scrollWidth, slider.clientWidth);
        const id = setInterval(_ => {
            slider.scrollLeft += 100;
            if (slider.scrollLeft + slider.clientWidth === slider.scrollWidth) {
                console.log("END");
                clearInterval(id);
            }
        }, 100);
    };
    const onPrev = _ => {
        const { current: slider } = sliderRef;
        const id = setInterval(_ => {
            slider.scrollLeft -= 100;
            if (!slider.scrollLeft) clearInterval(id);
        }, 100);
    };
    return (
        <>
            <div className="brands-slider">
                <div className="nav-side nav-side--prev" onMouseEnter={onPrev}>
                    <img src={prevIcon} alt="" />
                </div>

                <ul className="home-brands__list" ref={sliderRef}>
                    {brands.map(({ logo, name }) => (
                        <li className="home-brands__item" key={name}>
                            <img src={logo} alt="" />
                        </li>
                    ))}
                </ul>

                <div className="nav-side nav-side--next" onMouseEnter={onNext}>
                    <img src={nextIcon} alt="" />
                </div>
            </div>
        </>
    );
}
