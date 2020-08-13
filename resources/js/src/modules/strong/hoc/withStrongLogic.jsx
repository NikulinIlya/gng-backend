import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext } from "@/components/CartNotification";

import useBrands from "@/utils/useBrands";

const STRONG_CATEGORIES = [2, 4, 5, 6];

export default WrappedComponent => props => {
    const { products = [] } = props;
    const { dispatch: notificationDispatch } = useContext(
        CartNotificationContext
    );
    const { dispatch, productCategories } = useStoreon("productCategories");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoriesOfStrong, setCategoriesOfStrong] = useState([]);
    const extendedProducts = useBrands(filteredProducts);

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
            setFilteredProducts(
                products.filter(p =>
                    STRONG_CATEGORIES.includes(p.product_category_id)
                )
            );
        },
        [products]
    );
    useEffect(
        _ => {
            if (productCategories) {
                setCategoriesOfStrong(
                    productCategories.filter(pc =>
                        STRONG_CATEGORIES.includes(pc.id)
                    )
                );
            }
        },
        [productCategories]
    );
    return (
        <WrappedComponent
            {...props}
            products={extendedProducts}
            productCategories={categoriesOfStrong}
            onAdd={onAdd}
        />
    );
};
