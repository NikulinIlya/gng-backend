import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useBrands from "@/utils/useBrands";
import useFiltersApi from "@/utils/useFiltersApi";

export default WrappedComponent => props => {
    const { products = [] } = props;
    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const { dispatch, assistantPhrases } = useStoreon("assistantPhrases");

    const extendedProducts = useBrands(products);
    const filters = useFiltersApi("strong");

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

    return (
        <WrappedComponent
            {...props}
            products={extendedProducts}
            filters={filters}
            onAdd={onAdd}
        />
    );
};
