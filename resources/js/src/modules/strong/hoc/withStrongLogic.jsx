import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import useBrands from "@/utils/useBrands";

const STRONG_CATEGORIES = [2, 4, 5, 6];

export default WrappedComponent => props => {
    const { products = [] } = props;
    const { productCategories } = useStoreon("productCategories");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoriesOfStrong, setCategoriesOfStrong] = useState([]);
    const extendedProducts = useBrands(filteredProducts);

    useEffect(
        _ => {
            setFilteredProducts(
                products.filter(p =>
                    STRONG_CATEGORIES.includes(p.product_category_id)
                )
            );
        },
        [products]
    );
    useEffect(
        _ => {
            if (productCategories) {
                setCategoriesOfStrong(
                    productCategories.filter(pc =>
                        STRONG_CATEGORIES.includes(pc.id)
                    )
                );
            }
        },
        [productCategories]
    );
    return (
        <WrappedComponent
            {...props}
            products={extendedProducts}
            productCategories={categoriesOfStrong}
        />
    );
};
