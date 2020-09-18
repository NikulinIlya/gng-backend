import React, { useState, useReducer, useEffect } from "react";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";
import useRequestStatus from "@/utils/useRequestStatus";

const searchFetcher = createApiService("/api/search-products");
const productsFetcher = createApiService("/api/products");

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(searchReducer, {
        products: [],
        status: REQUEST.pending
    });

    const setStatus = useRequestStatus(dispatch);

    async function fetchSearchResults(query) {
        if (!query) return;
        setStatus(REQUEST.pending);
        const [err, searchResponse] = await searchFetcher({
            search: `?query=${query}`
        });
        if (err) return setStatus(REQUEST.error);
        console.log("searchResponse", searchResponse);
        dispatch({ type: "set-products", payload: searchResponse.data });
        setStatus(REQUEST.success);
    }

    async function fetchProducts() {
        setStatus(REQUEST.pending);
        const [err, productsResponse] = await productsFetcher({ search: "" });
        if (err) return setStatus(REQUEST.error);
        console.log("productsResponse", productsResponse);
        dispatch({ type: "set-products", payload: productsResponse.data });
        setStatus(REQUEST.success);
    }

    return (
        <WrappedComponent
            {...props}
            {...state}
            fetchSearchResults={fetchSearchResults}
            fetchProducts={fetchProducts}
        />
    );
};

function searchReducer(state, action) {
    switch (action.type) {
        case "set-products":
            return { ...state, products: action.payload };
        case "set-status":
            return { ...state, status: action.payload };
    }
}
