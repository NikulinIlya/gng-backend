import React, { useState, useEffect } from "react";

import { useStoreon } from "storeon/react";

export default WrappedComponent => props => {
    const { product } = props;
    const [extendedProduct, setExtendedProduct] = useState(product);
    const { flatBrandNames, flatRegionNames } = useStoreon("flatBrandNames");
    useEffect(_ => console.log("props", props));
    useEffect(
        _ => {
            if (Object.keys(product).length) {
                setExtendedProduct({
                    ...product,
                    brand: flatBrandNames[product.brand_id],
                    region: ''
                });
            }
        },
        [product, flatBrandNames, flatRegionNames]
    );
    return <WrappedComponent {...props} product={extendedProduct} />;
};
