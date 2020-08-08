import React, { useState, useEffect } from "react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(_ => {
        (async _ => {
            const [err, response] = await to(redaxios("/api/products"));
            console.log("response PRODUCTS", response.data);
            setProducts(response.data);
            setIsLoaded(true);
        })();
    }, []);
    return <WrappedComponent {...props} {...{ isLoaded, products }} />;
};
