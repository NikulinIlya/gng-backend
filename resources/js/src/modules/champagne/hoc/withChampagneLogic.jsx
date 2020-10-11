import React, { useState, useEffect, useContext, useReducer } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useBrands from "@/utils/useBrands";
import useFiltersApi from "@/utils/useFiltersApi";
import useMeasures from "@/utils/useMeasures";
import useCart from "@/utils/useCart";
import getRandom from "@/utils/get-random-item";

import champagneReducer from "../champagneReducer";

export default WrappedComponent => props => {
    const { products, page, history, champagneDispatch } = props;
    const [state, champagneDispatcher] = useReducer(champagneReducer, {
        filtersVisibility: false
    });
    const { notify } = useContext(CartNotificationContext);
    const { isMobile } = useMeasures();
    const filters = useFiltersApi("champagne");
    const { dispatch, assistantPhrases } = useStoreon("assistantPhrases");
    const extendedProducts = useBrands(products);
    const { add } = useCart();

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
        history.push(`${history.location.pathname}?page=${newPage}`);
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
