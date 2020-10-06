import React, { useState, useEffect, useReducer } from "react";
import { useStoreon } from "storeon/react";

import Button from "@/components/Button";
import Loading from "@/components/Loading";

import { status as REQUEST } from "@/utils/request-status";
import useTranslate from "@/utils/useTranslate";

import "./brands.scss";

export default function Brands() {
    const { t } = useTranslate();
    const { brands, flatRegionMapImages, flatRegionNames } = useStoreon(
        "brands",
        "flatRegionMapImages",
        "flatRegionNames"
    );

    const [{ sortedBrands, status }, dispatch] = useReducer(brandsReducer, {
        sortedBrands: [],
        status: REQUEST.pending
    });

    useEffect(
        _ => {
            if (brands && flatRegionMapImages && flatRegionNames) {
                dispatch({
                    type: "set-sorted-brands",
                    payload: brands.map(({ location_id, ...restProps }) => ({
                        ...restProps,
                        map: flatRegionMapImages[location_id],
                        regionName: flatRegionNames[location_id]
                    }))
                });
                dispatch({ type: "set-status", payload: REQUEST.success });
            }
        },
        [brands, flatRegionMapImages, flatRegionNames]
    );

    return (
        <div className="container">
            {status === REQUEST.pending && <Loading />}
            {status === REQUEST.success && (
                <div className="brands__grid">
                    {sortedBrands.map((b, i) => (
                        <div className="square-aspect-ratio-wrapper" key={i}>
                            <div className="brands__item">
                                <div className="brands__item-default-view">
                                    <img
                                        className="brands__item-logo"
                                        src={b.image}
                                        alt="logo"
                                    />
                                    <img
                                        className="brands__item-map"
                                        src={b.map}
                                        alt="map"
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
                                    <Button to={`/search?brand_id=${b.id}`}>
                                        {t(
                                            "brand-products",
                                            "Продукция бренда"
                                        )}
                                    </Button>
                                </section>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function brandsReducer(state, action) {
    switch (action.type) {
        case "set-sorted-brands":
            return { ...state, sortedBrands: action.payload };
        case "set-status":
            return { ...state, status: action.payload };
    }
}
