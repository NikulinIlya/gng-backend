import React, { useState, useEffect, useContext, useReducer } from "react";

import useBrands from "@/utils/useBrands";
import useFiltersApi from "@/utils/useFiltersApi";
import useMeasures from "@/utils/useMeasures";
import useCart from "@/utils/useCart";
import useQueryParams from "@/utils/useQueryParams";

import champagneReducer from "../champagneReducer";

export default WrappedComponent => props => {
    const { products, page, history, champagneDispatch } = props;
    const [state, champagneDispatcher] = useReducer(champagneReducer, {
        filtersVisibility: false
    });
    const { isMobile } = useMeasures();
    const filters = useFiltersApi("champagne");
    const extendedProducts = useBrands(products);
    const { add } = useCart();
    const { applyParam, search } = useQueryParams();

    useEffect(
        _ => {
            if (extendedProducts) {
                champagneDispatcher({
                    type: "set-products",
                    payload: extendedProducts
                });
            }
        },
        [extendedProducts]
    );

    useEffect(_ => handleFiltersVisibility(!isMobile), [isMobile]);

    const handleFiltersVisibility = state => {
        champagneDispatcher({
            type: "set-filters-visibility",
            payload: state
        });
    };

    const onAdd = async (id, count = 1) => {
        if (!id) return;

        const brandId = extendedProducts.find(p => p.id === id).brand_id;
        await add(id, count, brandId);
    };

    const onLoadMore = () => {
        const newPage = page + 1;
        champagneDispatch({ type: "set-cur-page", payload: newPage });
        history.push(
            `${history.location.pathname}${applyParam(search, "page", newPage)}`
        );
    };

    return (
        <WrappedComponent
            {...props}
            {...state}
            filters={filters}
            onAdd={onAdd}
            handleFiltersVisibility={handleFiltersVisibility}
            onLoadMore={onLoadMore}
        />
    );
};
