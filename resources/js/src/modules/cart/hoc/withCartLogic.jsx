import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products, loadProductsInCart, setIsLoaded } = props;

    const [cartSize, setCartSize] = useState(0);
    const [cartSum, setCartSum] = useState(0);

    const { dispatch, productsInCart } = useStoreon("productsInCart");
    const extendedProducts = useBrands(products);

    const onRemove = id => {
        if (!id) return;
        dispatch("cart/remove", id);
    };

    const onCountChange = (id, count) => {
        if (!id || typeof count === "undefined") return;
        dispatch("cart/change", { id, count });
    };

    useEffect(
        _ => {
            if (productsInCart.length !== products.length)
                loadProductsInCart(productsInCart.map(({ id }) => id));
            else setIsLoaded(true);

            setCartSize(
                productsInCart.reduce(
                    (acc, cur) => ((acc += cur.count), acc),
                    0
                )
            );
        },
        [productsInCart]
    );

    useEffect(
        _ => {
            if (products.length && productsInCart.length)
                setCartSum(
                    products.reduce((acc, cur) => {
                        const p = productsInCart.find(p => p.id === cur.id);
                        const curentPositionPrice = p
                            ? p.count * cur.price
                            : cur.price;
                        return (acc += curentPositionPrice);
                    }, 0)
                );
        },
        [products, productsInCart]
    );

    return (
        <WrappedComponent
            {...props}
            onRemove={onRemove}
            onCountChange={onCountChange}
            products={extendedProducts}
            productsInCart={productsInCart}
            cartSize={cartSize}
            cartSum={cartSum}
        />
    );
};
