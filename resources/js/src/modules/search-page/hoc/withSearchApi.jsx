import React, { useState, useEffect } from "react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    // const {} = useApiState()
    async function fetchSearchResults(query) {
        if (!query) return;
        setIsLoaded(false);
        const [err, searchResponse] = await to(
            redaxios(`/api/search-products?query=${query}`)
        );
        console.log("searchResponse", searchResponse);
        setProducts(searchResponse.data);
        setIsLoaded(true);
    }
    return (
        <WrappedComponent
            {...props}
            fetchSearchResults={fetchSearchResults}
            products={products}
            isLoaded={isLoaded}
        />
    );
};
