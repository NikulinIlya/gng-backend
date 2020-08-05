import React, { useState, useEffect } from "react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(_ => {
        (async _ => {
            const [err, response] = await to(
                redaxios("/api/products-by-category/wines")
            );
            setProducts(response.data.data[0]);
            setIsLoaded(true);
        })();
    }, []);
    return <WrappedComponent {...props} {...{ isLoaded, products }} />;
};
