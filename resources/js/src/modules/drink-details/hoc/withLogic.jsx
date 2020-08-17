import React, { useState, useEffect, useReducer, useContext } from "react";
import { useStoreon } from "storeon/react";

import { CartNotificationContext as Cart } from "@/components/CartNotification";
import isEmpty from "@/utils/is-empty";
import { to } from "@/utils/fetch"

import productDetailsReducer from "../product-details-reducer";

export default WrappedComponent => props => {
    const { product } = props;
    const { dispatch: notificationDispatch } = useContext(Cart);
    const [productCategory, setProductCategory] = useState({});
    const [isProductFavorite, setIsProductFavorite] = useState(false);
    const [schemeIsLoaded, setSchemeIsLoaded] = useState(false)

    const [productDetails, dispatchAction] = useReducer(productDetailsReducer, {});

    const {
        dispatch,
        brands,
        flatBrandNames,
        flatRegionNames,
        flatRegionImages,
        flatColorNames,
        favoriteProducts,
        productCategories
    } = useStoreon(
        "brands",
        "flatBrandNames",
        "flatRegionNames",
        "flatRegionImages",
        "flatColorNames",
        "favoriteProducts",
        "productCategories"
    );

    // check if product faforite
    useEffect(
        _ => {
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

    useEffect(_ => {
        if (!isEmpty(productCategory)) {
            (async _ => {
                const [err, response] = await to(import(`../details-templates/${productCategory.slug}`))
                console.log('r', response.default)
                dispatchAction({
                    type: 'reinit',
                    payload: response.default
                })
                setSchemeIsLoaded(true);
            })()
        }
    }, [productCategory])

    useEffect(_ => console.log("productDetails", productDetails), [
        productDetails
    ]);
    useEffect(_ => console.log('schemeIsLoaded',schemeIsLoaded),[schemeIsLoaded])

    // set product grape sorts
    useEffect(
        _ => {
            if (
                schemeIsLoaded &&
                !isEmpty(product) &&
                !isEmpty(productCategory) &&
                flatColorNames
            ) {
                const { slug } = productCategory;

                if (slug === 'wine') {
                    const joinGrapeNames = names =>
                        names.reduce((acc, g) => ((acc += g.name), acc), "");

                    const wineProps = {
                        grape_sorts: joinGrapeNames(product[slug].grape_sorts),
                        color: flatColorNames[product[slug].colour_id]
                    }

                    Object.entries(wineProps).forEach(([prop, payload]) =>
                        dispatchAction({ type: 'set', prop, payload }))
                }

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
        [product, productCategory, flatColorNames, schemeIsLoaded]
    );
    //

    // set product brand
    useEffect(
        _ => {
            if (schemeIsLoaded && !isEmpty(product) && flatBrandNames) {
                dispatchAction({
                    type: "set",
                    prop: "brand",
                    payload: flatBrandNames[product.brand_id]
                });
            }
        },
        [flatBrandNames, product,schemeIsLoaded]
    );
    //

    // set product region
    useEffect(
        _ => {
            if (schemeIsLoaded && !isEmpty(product) && brands && flatRegionNames) {
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
        [brands, flatRegionNames, product, schemeIsLoaded]
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

    const onAdd = (id, count = 1) => {
        if (!id) return;
        dispatch("cart/add", {
            product: { id, count },
            callback: _ =>
                notificationDispatch({
                    type: "HANDLE_VISIBILITY",
                    payload: true
                })
        });
    };

    return (
        <WrappedComponent
            {...props}
            product={product}
            productCategory={productCategory}
            productDetails={productDetails}
            brands={brands}
            flatRegionImages={flatRegionImages}
            isProductFavorite={isProductFavorite}
            onFavoriteStateChange={onFavoriteStateChange}
            onAdd={onAdd}
        />
    );
};
