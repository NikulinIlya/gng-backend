import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const { match } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState({});
    const [brandArticles, setBrandArticles] = useState([]);
    const [grapeArticles, setGrapeArticles] = useState([]);
    const [regionArticles, setRegionArticles] = useState([]);

    useEffect(_ => {
        (async _ => {
            const [err, productResponse] = await to(
                redaxios(`/api/product-with-settings/${match.params.productId}`)
            );
            const [brandArticlesErr, brandArticlesResponse] = await to(
                redaxios(`/api/articles/brands`)
            );
            const [grapeArticlesErr, grapeArticlesResponse] = await to(
                redaxios(`/api/articles/grapes`)
            );
            const [regionArticlesErr, regionArticlesResponse] = await to(
                redaxios(`/api/articles/regions`)
            );
            console.log("PR", productResponse.data);
            setRegionArticles(regionArticlesResponse.data);
            setGrapeArticles(grapeArticlesResponse.data);
            setBrandArticles(brandArticlesResponse.data);
            setProduct(productResponse.data);
            setIsLoaded(true);
        })();
    }, []);

    return (
        <WrappedComponent
            {...props}
            product={product}
            brandArticles={brandArticles}
            grapeArticles={grapeArticles}
            regionArticles={regionArticles}
            isLoaded={isLoaded}
        />
    );
};
