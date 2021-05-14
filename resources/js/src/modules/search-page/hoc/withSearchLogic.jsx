import React, { useState, useEffect, useLayoutEffect } from "react";
import { useStoreon } from "storeon/react";

import useBrands from "@/utils/useBrands";
import useCart from "@/utils/useCart";
import useQueryParams from "@/utils/useQueryParams";
import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const {
        products,
        productIds,
        fetchSearchResults,
        fetchProducts,
        fetchProductsByCategory,
        status: loadingStatus
    } = props;
    const [query, setQuery] = useState("");
    const [brandId, setBrandId] = useState("");
    const [category, setCategory] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [normalizingStatus, setNormalizingStatus] = useState(REQUEST.pending);

    const { params } = useQueryParams();
    const { flatBrandNames } = useStoreon("flatBrandNames");
    const { add } = useCart();
    const extendedProducts = useBrands(products);
    const [filteredProducts, setFilteredProducts] = useState(extendedProducts);

    useEffect(
        _ => {
            if (!params) return;
            
            if (params["query"] !== undefined) {
                setQuery(params["query"]);
                setBrandId("");
                setCategory("");
                setIsSearchMode(true);
                return;
            }

            if (params["brand_id"]) {
                setBrandId(params["brand_id"]);
                setIsSearchMode(false);
                return;
            }

            if (params["category"]) {
                setCategory(params["category"]);
                setIsSearchMode(false);
            }
        },
        [params]
    );

    useEffect(
        _ => {
            if (brandId) {
                fetchProducts();
            }
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

    useEffect(_ => (fetchSearchResults(query), Function.prototype), [query]);

    useEffect(
        _ => {
            if (loadingStatus === REQUEST.pending) return;

            if (isSearchMode) {
                setFilteredProducts(extendedProducts);
                setNormalizingStatus(REQUEST.success);
            } else {
                if (extendedProducts.length && brandId) {
                    setFilteredProducts(
                        extendedProducts.filter(p => p.brand_id === +brandId)
                    );
                    setNormalizingStatus(REQUEST.success);
                    return;
                }
                if (extendedProducts.length && productIds.length) {
                    setFilteredProducts(
                        extendedProducts.filter(p => productIds.includes(p.id))
                    );
                    setNormalizingStatus(REQUEST.success);
                    return;
                }
            }
        },
        [extendedProducts, productIds, brandId, loadingStatus, isSearchMode]
    );

    const onAdd = async (id, count = 1, brandId) =>
        await add(id, count, brandId);

    return (
        <WrappedComponent
            {...props}
            products={filteredProducts}
            query={query}
            brandId={brandId}
            category={category}
            brandNames={flatBrandNames}
            normalizingStatus={normalizingStatus}
            onAdd={onAdd}
        />
    );
};
