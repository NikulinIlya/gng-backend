import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useStoreon } from "storeon/react";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const {
        products,
        productIds,
        fetchSearchResults,
        fetchProducts,
        fetchProductsByCategory
    } = props;
    const [query, setQuery] = useState("");
    const [brandId, setBrandId] = useState("");
    const [category, setCategory] = useState("");
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
            if (category) {
                fetchProducts();
                fetchProductsByCategory(category);
            }
        },
        [category]
    );
    useEffect(
        _ => {
            if (extendedProducts.length && brandId) {
                setFilteredProducts(
                    extendedProducts.filter(p => p.brand_id === +brandId)
                );
                return;
            }
            if (productIds.length && extendedProducts.length) {
                setFilteredProducts(
                    extendedProducts.filter(p => productIds.includes(p.id))
                );
                return;
            }
            setFilteredProducts(extendedProducts);
        },
        [extendedProducts, productIds, brandId]
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
        if (params.has("category") && params.get("category")) {
            setCategory(params.get("category"));
        }
    }

    return (
        <WrappedComponent
            {...props}
            products={filteredProducts}
            query={query}
            brandId={brandId}
            category={category}
            brandNames={flatBrandNames}
        />
    );
};
