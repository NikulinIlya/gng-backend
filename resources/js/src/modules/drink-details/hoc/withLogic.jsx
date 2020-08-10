import React, { useState, useEffect } from "react";

import { useStoreon } from "storeon/react";

export default WrappedComponent => props => {
    const { product } = props;
    const [extendedProduct, setExtendedProduct] = useState(product);
    const [isProductFavorite, setIsProductFavorite] = useState(false);
    const {
        dispatch,
        flatBrandNames,
        flatRegionNames,
        favoriteProducts
    } = useStoreon("flatBrandNames", "flatRegionNames", "favoriteProducts");
    useEffect(
        _ => {
            if (Object.keys(product).length && favoriteProducts) {
                setIsProductFavorite(favoriteProducts.includes(product.id));
            }
        },
        [favoriteProducts, product]
    );
    useEffect(
        _ => {
            if (Object.keys(product).length) {
                setExtendedProduct({
                    ...product,
                    brand: flatBrandNames[product.brand_id],
                    region: ""
                });
            }
        },
        [product, flatBrandNames, flatRegionNames]
    );
    const onFavoriteStateChange = ({ target }) => {
        const state = target.checked;
        if (state) {
            dispatch("client/set-favorite-products", [
                ...new Set([...favoriteProducts, product.id])
            ]);
        } else {
            dispatch(
                "client/set-favorite-products",
                favoriteProducts.includes(product.id)
                    ? favoriteProducts.filter(p => p !== product.id)
                    : favoriteProducts
            );
        }
        setIsProductFavorite(state);
    };
    return (
        <WrappedComponent
            {...props}
            product={extendedProduct}
            isProductFavorite={isProductFavorite}
            onFavoriteStateChange={onFavoriteStateChange}
        />
    );
};
