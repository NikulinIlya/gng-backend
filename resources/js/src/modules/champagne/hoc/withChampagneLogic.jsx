import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products } = props;
    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const { dispatch } = useStoreon();
    const extendedProducts = useBrands(products);

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

    return (
        <WrappedComponent
            {...props}
            products={extendedProducts}
            onAdd={onAdd}
        />
    );
};
