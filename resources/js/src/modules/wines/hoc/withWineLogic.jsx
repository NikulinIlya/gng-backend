import React, { useState, useEffect, useContext } from "react";

import useMeasures from "@/utils/useMeasures";
import useBrands from "@/utils/useBrands";
import useFilters from "@/utils/useFiltersApi";
import useQueryParams from "@/utils/useQueryParams";
import useCart from "@/utils/useCart";

export default WrappedComponent => props => {
    const { products, page, wineStateDispatcher, history } = props;

    const { isMobile } = useMeasures();
    const { applyParam } = useQueryParams();
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const extendedProducts = useBrands(products);
    const filters = useFilters("wine");
    const { add } = useCart();

    const onAdd = async (id, count = 1) => {
        if (!id) return;

        const brandId = extendedProducts.find(p => p.id === id).brand_id;
        await add(id, count, brandId);
    };

    const onLoadMore = () => {
        const newPage = page + 1;
        const url = applyParam(location.search, "page", newPage);
        wineStateDispatcher({ type: "set-cur-page", payload: newPage });
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
                products: extendedProducts,
                isMobile,
                filtersVisibility,
                handleFiltersVisibility: setFiltersVisibility,
                onAdd,
                onLoadMore
            }}
        />
    );
};
