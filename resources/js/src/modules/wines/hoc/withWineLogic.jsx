import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useMeasures from "@/utils/useMeasures";
import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products } = props;
    const { isMobile } = useMeasures();
    const [wines, setWines] = useState([]);
    const { dispatch } = useStoreon();
    
    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const extendedProducts = useBrands(wines);

    
    const handleFiltersVisibility = state => _ => setFiltersVisibility(state);
    const onAdd = (id, count = 1) => {
        if (!id) return;
        dispatch("cart/add", {
            product: { id, count },
            callback: _ =>
                notificationDispatch({
                    type: "HANDLE_VISIBILITY",
                    payload: true
                })
        });
    };


    useEffect(
        _ => {
            setWines(products.map(p => ({ ...p, ...p.product })));
        },
        [products]
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
            {...{ isMobile, filtersVisibility, handleFiltersVisibility, onAdd }}
            products={extendedProducts}
        />
    );
};
