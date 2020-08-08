import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

export default function useBrands(products = [], brandKey = "brand_id") {
    const [expandedProducts, setExpandedProducts] = useState(products);
    const { flatBrandNames } = useStoreon("flatBrandNames");

    const decorateProductsWithBrands = (products, brands, brandKey) =>
        products.map(({ ...product }) => ({
            ...product,
            brand: brands[product[brandKey]]
        }));

    useEffect(
        _ => {
            setExpandedProducts(
                decorateProductsWithBrands(products, flatBrandNames, brandKey)
            );
        },
        [products, brandKey, flatBrandNames]
    );

    return expandedProducts;
}
