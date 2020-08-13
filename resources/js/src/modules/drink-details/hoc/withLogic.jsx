import React, { useState, useEffect, useReducer } from "react";

import { useStoreon } from "storeon/react";

import isEmpty from "@/utils/is-empty";

import initialDetails from "../product-details-template";
import productDetailsReducer from "../product-details-reducer";

const wineDetails = [
    "brand",
    "grape_sorts",
    "temperature",
    "colour_id",
    "strength"
];

export default WrappedComponent => props => {
    const { product } = props;
    const [productCategory, setProductCategory] = useState({});
    const [isProductFavorite, setIsProductFavorite] = useState(false);

    const [productDetails, dispatchAction] = useReducer(
        productDetailsReducer,
        initialDetails
    );

    const {
        dispatch,
        brands,
        flatBrandNames,
        flatRegionNames,
        flatColorNames,
        favoriteProducts,
        productCategories
    } = useStoreon(
        "brands",
        "flatBrandNames",
        "flatRegionNames",
        "flatColorNames",
        "favoriteProducts",
        "productCategories"
    );

    // check if product faforite
    useEffect(
        _ => {
            console.log('product',product)
            if (!isEmpty(product) && favoriteProducts) {
                setIsProductFavorite(favoriteProducts.includes(product.id));
            }
        },
        [favoriteProducts, product]
    );
    //

    //  set product category
    useEffect(
        _ => {
            if (!isEmpty(product) && productCategories) {
                const productCategory = productCategories.find(
                    pc => pc.id === product.product_category_id
                );
                setProductCategory(productCategory);
            }
        },
        [productCategories, product]
    );
    //

    useEffect(_ => console.log("productDetails", productDetails), [
        productDetails
    ]);

    // set product grape sorts
    useEffect(
        _ => {
            if (
                !isEmpty(product) &&
                !isEmpty(productCategory) &&
                flatColorNames
            ) {
                const { slug } = productCategory;
                const joinGrapeNames = names =>
                    names.reduce((acc, g) => ((acc += g.name), acc), "");

                dispatchAction({
                    type: "set",
                    prop: "grape_sorts",
                    payload: joinGrapeNames(product[slug].grape_sorts)
                });
                dispatchAction({
                    type: "set",
                    prop: "color",
                    payload: flatColorNames[product[slug].colour_id]
                });
                dispatchAction({
                    type: "set",
                    prop: "temperature",
                    payload: product[slug].temperature
                });
                dispatchAction({
                    type: "set",
                    prop: "strength",
                    payload: product[slug].strength
                });
            }
        },
        [product, productCategory, flatColorNames]
    );
    //

    // set product brand
    useEffect(
        _ => {
            if (!isEmpty(product) && flatBrandNames) {
                dispatchAction({
                    type: "set",
                    prop: "brand",
                    payload: flatBrandNames[product.brand_id]
                });
            }
        },
        [flatBrandNames, product]
    );
    //

    // set product temperature
    useEffect(
        _ => {
            if (!isEmpty(product) && flatBrandNames) {
                dispatchAction({
                    type: "set",
                    prop: "brand",
                    payload: flatBrandNames[product.brand_id]
                });
            }
        },
        [product]
    );
    //

    // set product region
    useEffect(
        _ => {
            if (!isEmpty(product) && brands && flatRegionNames) {
                const brandInstance = brands.find(
                    b => b.id === product.brand_id
                );
                dispatchAction({
                    type: "set",
                    prop: "region",
                    payload: flatRegionNames[brandInstance.location_id]
                });
            }
        },
        [brands, flatRegionNames, product]
    );
    //

    const onFavoriteStateChange = ({ target }) => {
        const state = target.checked;
        if (state) {
            dispatch("client/set-favorite-products", [
                ...new Set([...favoriteProducts, product.id])
            ]);
        } else {
            dispatch(
                "client/set-favorite-products",
                favoriteProducts.includes(product.id)
                    ? favoriteProducts.filter(p => p !== product.id)
                    : favoriteProducts
            );
        }
        setIsProductFavorite(state);
    };
    return (
        <WrappedComponent
            {...props}
            product={product}
            productCategory={productCategory}
            productDetails={productDetails}
            brands={flatBrandNames}
            isProductFavorite={isProductFavorite}
            onFavoriteStateChange={onFavoriteStateChange}
        />
    );
};
