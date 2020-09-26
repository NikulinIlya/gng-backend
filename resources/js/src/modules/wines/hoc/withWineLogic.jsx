import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useMeasures from "@/utils/useMeasures";
import useBrands from "@/utils/useBrands";
import useFilters from "@/utils/useFiltersApi";
import useQueryParams from "@/utils/useQueryParams";
import getRandom from "@/utils/get-random-item";

export default WrappedComponent => props => {
    const { products, page, wineStateDispatcher, history } = props;

    const { isMobile } = useMeasures();
    const { dispatch, assistantPhrases } = useStoreon("assistantPhrases");
    const { notify } = useContext(CartNotificationContext);
    const { applyParam } = useQueryParams();
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const extendedProducts = useBrands(products);
    const filters = useFilters("wine");

    const onAdd = (id, count = 1) => {
        if (!id) return;

        const brandId = extendedProducts.find(p => p.id === id).brand_id;

        dispatch("cart/add", {
            product: { id, count },
            callback: _ =>
                notify({
                    text: getRandom(assistantPhrases[brandId])
                })
        });
    };

    const onLoadMore = () => {
        const url = applyParam(location.search, "page", page + 1);
        history.push(url);
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
                handleFiltersVisibility: setFiltersVisibility,
                onAdd,
                onLoadMore
            }}
            products={extendedProducts}
        />
    );
};
