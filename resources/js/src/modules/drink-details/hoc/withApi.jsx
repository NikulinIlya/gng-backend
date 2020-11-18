import React, { useState, useEffect } from "react";

import redaxios, { to } from "@/utils/fetch";
import UNIT from "@/utils/product-unit";

export default WrappedComponent => props => {
    const { match, location } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState({});
    const [brandArticles, setBrandArticles] = useState([]);
    const [grapeArticles, setGrapeArticles] = useState([]);
    const [regionArticles, setRegionArticles] = useState([]);
    const [countIn, setCountIn] = useState(UNIT.thing);

    useEffect(_ => {
        (async _ => {
            const isPromotion = location.search.includes("_view=promotion");
            const targetPath = isPromotion
                ? "products"
                : "product-with-settings";

            const [err, productResponse] = await to(
                redaxios(`/api/${targetPath}/${match.params.productId}`)
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
            setProduct(
                isPromotion ? productResponse.data[0] : productResponse.data
            );
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
            countIn={countIn}
            setCountIn={setCountIn}
        />
    );
};
