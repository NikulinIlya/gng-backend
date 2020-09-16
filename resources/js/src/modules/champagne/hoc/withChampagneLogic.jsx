import React, { useState, useEffect, useContext, useReducer } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useBrands from "@/utils/useBrands";
import useFiltersApi from "@/utils/useFiltersApi";
import useMeasures from "@/utils/useMeasures";

import champagneReducer from "../champagneReducer";

export default WrappedComponent => props => {
    const { products, page, history, champagneDispatch } = props;
    const [state, champagneDispatcher] = useReducer(champagneReducer, {
        filtersVisibility: false
    });
    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const { isMobile } = useMeasures();
    const filters = useFiltersApi("champagne");
    const { dispatch, assistantPhrases } = useStoreon("assistantPhrases");
    const extendedProducts = useBrands(products);

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

    const onAdd = (id, count = 1) => {
        if (!id) return;
        dispatch("cart/add", {
            product: { id, count },
            callback: _ =>
                notificationDispatch({
                    type: "HANDLE_VISIBILITY",
                    payload: true,
                    fact:
                        assistantPhrases[
                            Math.floor(Math.random() * assistantPhrases.length)
                        ].phrase
                })
        });
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
