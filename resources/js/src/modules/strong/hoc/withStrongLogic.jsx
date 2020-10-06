import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useBrands from "@/utils/useBrands";
import useFiltersApi from "@/utils/useFiltersApi";
import useMeasures from "@/utils/useMeasures";
import useQueryParams from "@/utils/useQueryParams";
import getRandom from "@/utils/get-random-item";

export default WrappedComponent => props => {
    const { products = [], page, history } = props;
    const { notify } = useContext(CartNotificationContext);
    const { applyParam } = useQueryParams();
    const { isMobile } = useMeasures();
    const { dispatch, assistantPhrases } = useStoreon("assistantPhrases");
    const [filtersVisibility, setFiltersVisibility] = useState(false);

    const extendedProducts = useBrands(products);
    const filters = useFiltersApi("strong");

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
