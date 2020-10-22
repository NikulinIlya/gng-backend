import React, { useState, useEffect, useContext } from "react";

import useBrands from "@/utils/useBrands";
import useFiltersApi from "@/utils/useFiltersApi";
import useMeasures from "@/utils/useMeasures";
import useQueryParams from "@/utils/useQueryParams";
import useCart from "@/utils/useCart";

export default WrappedComponent => props => {
    const { products = [], page, history, strongDispatcher } = props;
    const { applyParam } = useQueryParams();
    const { isMobile } = useMeasures();
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const { add } = useCart();

    const extendedProducts = useBrands(products);
    const filters = useFiltersApi("strong");

    const onAdd = async (id, count = 1) => {
        if (!id) return;

        const brandId = extendedProducts.find(p => p.id === id).brand_id;
        await add(id, count, brandId);
    };

    const onLoadMore = () => {
        const newPage = page + 1;
        const url = applyParam(location.search, "page", newPage);
        strongDispatcher({ type: "set-cur-page", payload: newPage });
        history.push(url);
    };

    useEffect(_ => setFiltersVisibility(!isMobile), [isMobile]);

    return (
        <WrappedComponent
            {...props}
            products={extendedProducts}
            filtersVisibility={filtersVisibility}
            handleFiltersVisibility={setFiltersVisibility}
            filters={filters}
            onAdd={onAdd}
            onLoadMore={onLoadMore}
        />
    );
};
