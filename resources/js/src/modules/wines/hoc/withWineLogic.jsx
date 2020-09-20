import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";
import { useLocation } from "react-router-dom"

import { CartNotificationContext } from "@/components/CartNotification";

import useMeasures from "@/utils/useMeasures";
import useBrands from "@/utils/useBrands";
import useFilters from "@/utils/useFiltersApi";

export default WrappedComponent => props => {
    const { products, page, wineStateDispatcher, history } = props;
    const { isMobile } = useMeasures();
    const { dispatch, assistantPhrases } = useStoreon("assistantPhrases");

    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const extendedProducts = useBrands(products);
    const filters = useFilters("wine");

    const handleFiltersVisibility = state => setFiltersVisibility(state);

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
        const newPage = page + 1
        history.push(`${history.location.pathname}?page=${newPage}`)
    };

    useEffect(
        _ => {
            wineStateDispatcher({ type: "set-filters", payload: filters });
        },
        [filters]
    );

    useEffect(_ => setFiltersVisibility(!isMobile), [isMobile]);

    useEffect(
        _ => {
            document.body.style.position =
                filtersVisibility && isMobile ? "fixed" : "static";
        },
        [filtersVisibility, isMobile]
    );
    return (
        <WrappedComponent
            {...props}
            {...{
                isMobile,
                filtersVisibility,
                handleFiltersVisibility,
                onAdd,
                onLoadMore
            }}
            products={extendedProducts}
        />
    );
};
