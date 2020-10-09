import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

export default function useBrands(products = [], brandKey = "brand_id") {
    const [expandedProducts, setExpandedProducts] = useState(products);
    const { flatBrandNames, brands } = useStoreon("flatBrandNames", "brands");

    const decorateProductsWithBrands = (products, brandNames, brandKey) =>
        products.map(product => ({
            ...product,
            brand: brandNames[product[brandKey]]
        }));

    const decorateProductsWithBackdropOptions = (products, brands, brandKey) =>
        products.map(product => {
            if (!brands) return product;
            const brand = brands.find(b => b.id === product[brandKey]) || {
                background: "option1"
            };
            return {
                ...product,
                backdrop:
                    brand.background === "option3" ? null : brand.background
            };
        });

    useEffect(
        _ => {
            if (products && flatBrandNames && brands) {
                setExpandedProducts(
                    decorateProductsWithBackdropOptions(
                        decorateProductsWithBrands(
                            products,
                            flatBrandNames,
                            brandKey
                        ),
                        brands,
                        brandKey
                    )
                );
            }
        },
        [products, brandKey, flatBrandNames, brands]
    );

    return expandedProducts;
}
