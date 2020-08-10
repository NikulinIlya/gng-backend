import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import redaxios, { to } from "@/utils/fetch";

const particularInfoEndpoint = {
    1: "/api/vines/"
};

export default WrappedComponent => props => {
    const { match } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState({});
    const { productCategories } = useStoreon("productCategories");
    useEffect(_ => {
        (async _ => {
            const [err, productResponse] = await to(
                redaxios(`/api/products/${match.params.productId}`)
            );
            console.log("PR", productResponse.data[0]);
            setProduct(productResponse.data[0]);
            setIsLoaded(true);
        })();
    }, []);

    // useEffect(
    //     _ => {
    //         console.log("productCategories", productCategories);
    //     },
    //     [productCategories, product]
    // );

    return (
        <WrappedComponent {...props} product={product} isLoaded={isLoaded} />
    );
};
