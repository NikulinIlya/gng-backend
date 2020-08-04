import React, { useState, useEffect, useRef } from "react";
import IconButton from "@/components/IconButton";

import brands from "@/modules/brands/static";

export default function BrandsSlider() {
    const sliderRef = useRef(null);
    const onNext = _ => {
        const { current: slider } = sliderRef;
        slider.scrollLeft += 100;
    };
    const onPrev = _ => {
        const { current: slider } = sliderRef;
        const id = setInterval(_ => {
            slider.scrollLeft -= 100;
        }, 100);
    };
    return (
        <>
            {/* <IconButton
                onClick={onPrev}
                className="home-brands__nav-btn btn--prev"
            >
                prev
            </IconButton> */}
            <ul className="home-brands__list" ref={sliderRef}>
                {brands.map(({ logo, name }) => (
                    <li className="home-brands__item" key={name}>
                        <img src={logo} alt="" />
                    </li>
                ))}
            </ul>
            {/* <IconButton
                onClick={onNext}
                className="home-brands__nav-btn btn--next"
            >
                next
            </IconButton> */}
        </>
    );
}
