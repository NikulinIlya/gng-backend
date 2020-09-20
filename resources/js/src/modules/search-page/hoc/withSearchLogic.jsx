import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useStoreon } from "storeon/react";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products, fetchSearchResults, fetchProducts } = props;
    const [query, setQuery] = useState("");
    const [brandId, setBrandId] = useState("");
    const { search } = useLocation();
    const { flatBrandNames } = useStoreon("flatBrandNames");
    const extendedProducts = useBrands(products);
    const [filteredProducts, setFilteredProducts] = useState(extendedProducts);

    useEffect(_ => handleSearchQuery(search), [search]);
    useEffect(
        _ => {
            brandId && fetchProducts();
        },
        [brandId]
    );
    useEffect(
        _ => {
            if (extendedProducts.length && brandId) {
                setFilteredProducts(
                    extendedProducts.filter(p => p.brand_id === +brandId)
                );
                return;
            }
            setFilteredProducts(extendedProducts);
        },
        [extendedProducts, brandId]
    );
    useEffect(_ => (fetchSearchResults(query), Function.prototype), [query]);

    function handleSearchQuery(search) {
        if (!search) return;
        const params = new URLSearchParams(search);
        if (params.has("query") && params.get("query")) {
            setQuery(params.get("query"));
            setBrandId("");
            return;
        }
        if (params.has("brand_id") && params.get("brand_id")) {
            setBrandId(params.get("brand_id"));
        }
    }

    return (
        <WrappedComponent
            {...props}
            products={filteredProducts}
            query={query}
            brandId={brandId}
            brandNames={flatBrandNames}
        />
    );
};
