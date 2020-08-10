import React, { useState, useEffect } from "react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(_ => {
        (async _ => {
            const [err, productsResponse] = await to(redaxios("/api/products"));
            setProducts(productsResponse.data);
            setIsLoaded(true);
        })();
    }, []);
    return (
        <WrappedComponent {...props} isLoaded={isLoaded} products={products} />
    );
};
