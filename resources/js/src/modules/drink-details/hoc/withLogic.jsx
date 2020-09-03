import React, { useState, useEffect, useReducer, useContext } from "react";
import { useStoreon } from "storeon/react";
import { useLocation } from "react-router-dom";

import { CartNotificationContext as Cart } from "@/components/CartNotification";
import isEmpty from "@/utils/is-empty";
import getRandom from "@/utils/get-random-item";
import { to } from "@/utils/fetch";
import useTranslate from "@/utils/useTranslate";

import { history } from "@";

import productDetailsReducer from "../product-details-reducer";

export default WrappedComponent => props => {
    const { product, brandArticles, grapeArticles, regionArticles } = props;
    const { dispatch: notificationDispatch } = useContext(Cart);
    const location = useLocation();
    const { t } = useTranslate();
    const [productCategory, setProductCategory] = useState({});
    const [productRegion, setProductRegion] = useState({});
    const [isProductFavorite, setIsProductFavorite] = useState(false);
    const [schemeIsLoaded, setSchemeIsLoaded] = useState(false);
    const [articleSet, setArticles] = useState({});
    const [currentArticle, setCurrentArticle] = useState(null);

    const [productDetails, dispatchAction] = useReducer(
        productDetailsReducer,
        {}
    );

    const {
        dispatch,
        brands,
        flatBrandNames,
        flatRegionNames,
        flatRegionImages,
        flatColorNames,
        favoriteProducts,
        productCategories,
        dictionary,
        assistantPhrases
    } = useStoreon(
        "brands",
        "flatBrandNames",
        "flatRegionNames",
        "flatRegionImages",
        "flatColorNames",
        "favoriteProducts",
        "productCategories",
        "dictionary",
        "assistantPhrases"
    );

    // articles
    useEffect(
        _ => {
            brandArticles.length &&
                setArticles({ ...articleSet, brand: getRandom(brandArticles) });
        },
        [brandArticles]
    );

    useEffect(
        _ => {
            const params = new URLSearchParams(location.search);
            setCurrentArticle(
                params.has("article") ? params.get("article") : null
            );
        },
        [location.search]
    );

    useEffect(
        _ => {
            grapeArticles.length &&
                setArticles({ ...articleSet, grape: getRandom(grapeArticles) });
        },
        [grapeArticles]
    );
    useEffect(
        _ => {
            regionArticles.length &&
                setArticles({
                    ...articleSet,
                    region: getRandom(regionArticles)
                });
        },
        [regionArticles]
    );
    useEffect(
        _ => {
            console.log("articleSet", articleSet);
        },
        [articleSet]
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

    //  set product category and default scheme
    useEffect(
        _ => {
            if (!isEmpty(product) && productCategories) {
                const id = product["product_category_id"];
                const category = productCategories.find(c => c.id === id);
                if (category) {
                    const { slug } = category;
                    (async _ => {
                        const [err, response] = await to(
                            import(`../details-templates/${slug}`)
                        );
                        dispatchAction({
                            type: "reinit",
                            payload: response.default
                        });
                        setProductCategory(category);
                        setSchemeIsLoaded(true);
                    })();
                }
            }
        },
        [productCategories, product]
    );
    //

    useEffect(_ => console.log("productDetails", productDetails), [
        productDetails
    ]);

    // set common props
    useEffect(
        _ => {
            const { slug } = productCategory;
            const wineOrChampagne = ["wine", "champagne"];
            const strong = ["cognac", "vodka", "whiskey"];

            if (schemeIsLoaded && brands) {
                const brandInstance = brands.find(
                    b => b.id === product.brand_id
                );

                const commonDrinkProps = {
                    region: flatRegionNames[brandInstance.location_id],
                    brand: flatBrandNames[product.brand_id],
                    strength: `${product[slug].strength}%`
                };

                const wineProps = {
                    grape_sorts: _ => joinGrapeNames(product[slug].grape_sorts),
                    color: flatColorNames[product[slug].colour_id],
                    temperature: product[slug].temperature
                };

                const strongProps = {
                    aging: product[slug].aging,
                    taste: product[slug].taste
                };

                if (wineOrChampagne.includes(slug)) applyProps(wineProps);
                if (strong.includes(slug)) applyProps(strongProps);
                if (slug === "cognac")
                    applyProps({ class: product[slug].class });
                if (slug === "vodka") applyProps({ raw: product[slug].raw });

                applyProps(commonDrinkProps);
                setProductRegion(brandInstance.location_id);
            }
        },
        [
            productCategory,
            brands,
            flatRegionNames,
            flatBrandNames,
            schemeIsLoaded
        ]
    );

    // set dosage
    useEffect(
        _ => {
            const { slug } = productCategory;
            if (schemeIsLoaded && slug === "champagne" && dictionary) {
                dispatchAction({
                    type: "set",
                    prop: "dosage",
                    payload: `${product[slug].dosage} ${t("g-l", "г/л")}`
                });
            }
        },
        [schemeIsLoaded, productCategory, dictionary]
    );

    function joinGrapeNames(names) {
        return names.map(({ name }) => name).join(", ");
    }

    function setPayload(payload) {
        return typeof payload === "function" ? payload() : payload;
    }

    function applyProps(props) {
        Object.entries(props).forEach(([prop, payload]) =>
            dispatchAction({
                type: "set",
                prop,
                payload: setPayload(payload)
            })
        );
    }

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

    const onAdd = (id, count = 1, brandId) => {
        if (!id) return;
        // if (assistantPhrases && brandId) {
        //     const suitable = assistantPhrases.filter(({ brand_id }) => brand_id === brandId)
        //     console.log('assistantPhrases',suitable,brandId)
        // }
        dispatch("cart/add", {
            product: { id, count },
            callback: _ =>
                notificationDispatch({
                    type: "HANDLE_VISIBILITY",
                    payload: true,
                    fact:
                        assistantPhrases[
                            Math.floor(Math.random() * assistantPhrases.length)
                        ].phrase
                })
        });
    };

    const onHideArticle = () => history.push(location.pathname);

    return (
        <WrappedComponent
            {...props}
            product={product}
            productCategory={productCategory}
            productRegion={productRegion}
            productDetails={productDetails}
            articleSet={articleSet}
            currentArticle={currentArticle}
            flatRegionImages={flatRegionImages}
            isProductFavorite={isProductFavorite}
            onFavoriteStateChange={onFavoriteStateChange}
            onAdd={onAdd}
            onHideArticle={onHideArticle}
        />
    );
};
