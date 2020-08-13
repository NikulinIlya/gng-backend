import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import SearchInput from "@/components/SearchInput";
import { HeaderContext } from "@/context/header";
import { CartNotificationContext } from "@/components/CartNotification";

import useMeasures from "@/utils/useMeasures";
import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products } = props;
    const { isMobile } = useMeasures();
    const [wines, setWines] = useState([]);
    const { dispatch } = useStoreon();
    const { setComponent } = useContext(HeaderContext);
    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const extendedProducts = useBrands(wines);

    const onInputChange = _ => console.log(_.target.value);
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

    useEffect(_ => {
        setComponent(_ => <SearchInput onChange={onInputChange} />);
    }, []);

    useEffect(
        _ => {
            setWines(products.map(p => ({ ...p, ...p.product })));
        },
        [products]
    );

    useEffect(_ => console.log("wines", extendedProducts), [extendedProducts]);

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
