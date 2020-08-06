import React, { useState, useEffect } from "react";

import Button from "@/components/Button";
import Loading from "@/components/Loading";

import { useStoreon } from "storeon/react";

import "./brands.scss";

export default function Brands() {
    const { brands, flatRegionMapImages, flatRegionNames } = useStoreon(
        "brands",
        "flatRegionMapImages",
        "flatRegionNames"
    );
    const [sortedBrands, setSortedBrands] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(
        _ => {
            if (brands && flatRegionMapImages && flatRegionNames) {
                setSortedBrands(
                    brands.map(({ location_id, ...restProps }) => ({
                        ...restProps,
                        map: flatRegionMapImages[location_id],
                        regionName: flatRegionNames[location_id]
                    }))
                );
                setIsLoaded(true);
            }
        },
        [brands, flatRegionMapImages, flatRegionNames]
    );
    useEffect(_ => console.log("sortedBrands", sortedBrands), [sortedBrands]);
    return (
        <div className="container">
            {isLoaded ? (
                <div className="brands__grid">
                    {sortedBrands.map((b, i) => (
                        <div className="square-aspect-ratio-wrapper" key={i}>
                            <div className="brands__item">
                                <div className="brands__item-default-view">
                                    <img
                                        className="brands__item-logo"
                                        src={b.image}
                                        alt=""
                                    />
                                    <img
                                        className="brands__item-map"
                                        src={b.map}
                                        alt=""
                                    />
                                </div>

                                <section
                                    className="brands__item-hovered-view"
                                    hidden
                                >
                                    <h2 className="brands__item-name">
                                        {b.name}
                                    </h2>
                                    <p className="brands__item-country">
                                        {b.regionName}
                                    </p>
                                    <p className="brands__item-history">
                                        {b.description}
                                    </p>
                                    <Button>Продукция бренда</Button>
                                </section>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
