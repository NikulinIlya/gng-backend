import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    const loadProductsInCart = async ids => {
        setIsLoaded(false);
        const requests = ids.map(id => redaxios(`/api/products/${id}`));
        const results = await Promise.all(requests);
        setProducts(results.map(r => r.data[0]));
        setIsLoaded(true);
    };

    return (
        <WrappedComponent
            {...props}
            isLoaded={isLoaded}
            products={products}
            loadProductsInCart={loadProductsInCart}
        />
    );
};
