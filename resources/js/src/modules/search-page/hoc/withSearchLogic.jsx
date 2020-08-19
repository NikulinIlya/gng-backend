import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products, fetchSearchResults } = props;
    const [query, setQuery] = useState("");
    const { search } = useLocation();
    const extendedProducts = useBrands(products);
    
    useEffect(_ => handleSearchQuery(search), [search]);
    useEffect(_ => (fetchSearchResults(query), Function.prototype), [query]);

    function handleSearchQuery(search) {
        if (!search) return;
        const params = new URLSearchParams(search);
        if (params.has("query") && params.get("query")) {
            setQuery(params.get("query"));
        }
    }

    return (
        <WrappedComponent
            {...props}
            products={extendedProducts}
            query={query}
        />
    );
};
