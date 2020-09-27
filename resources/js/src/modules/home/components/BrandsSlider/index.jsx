import React, { useState, useEffect, useRef } from "react";

import brands from "@/modules/brands/static";

import "./brands-slider.scss";

export default function BrandsSlider() {
    const sliderRef = useRef(null);
    const [dir, setDir] = useState(1);

    useEffect(
        _ => {
            const id = autoScroll(dir);
            return _ => clearInterval(id);
        },
        [dir]
    );

    const autoScroll = dir => {
        const { current: slider } = sliderRef;
        const id = setInterval(_ => {
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                setDir(-1);
            } else if (!slider.scrollLeft) {
                setDir(1);
            }
            if (dir === 1) {
                slider.scrollLeft += 1;
            } else {
                slider.scrollLeft -= 1;
            }
        }, 50);
        return id;
    };

    return (
        <>
            <div className="brands-slider">
                <ul className="home-brands__list" ref={sliderRef}>
                    {brands.map(({ logo, name }) => (
                        <li className="home-brands__item" key={name}>
                            <img src={logo} alt="" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
