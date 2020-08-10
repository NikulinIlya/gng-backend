import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import useBrands from "@/utils/useBrands";

export default WrappedComponent => props => {
    const { products } = props;
    const { favoriteProducts, flatBrandNames } = useStoreon(
        "favoriteProducts",
        "flatBrandNames"
    );
    const [isListEmpty, setIsListEmpty] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const extendedProducts = useBrands(products);
    useEffect(_ => console.log("extendedProducts", extendedProducts), [
        extendedProducts
    ]);
    useEffect(
        _ => {
            if (favoriteProducts.length) {
                setFilteredProducts(
                    extendedProducts.filter(p =>
                        favoriteProducts.includes(p.id)
                    )
                );
            } else {
                setIsListEmpty(true);
            }
        },
        [favoriteProducts, extendedProducts]
    );
    return (
        <WrappedComponent
            {...props}
            isListEmpty={isListEmpty}
            favoriteProducts={filteredProducts}
        />
    );
};
