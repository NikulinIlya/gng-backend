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

function articlesReducer(state, action) {
    switch (action.type) {
        case "set-brand-article":
            return { ...state, brand: action.payload };
        case "set-grape-article":
            return { ...state, grape: action.payload };
        case "set-region-article":
            return { ...state, region: action.payload };
    }
}

export default WrappedComponent => props => {
    const { product, brandArticles, grapeArticles, regionArticles } = props;
    const { notify } = useContext(Cart);
    const location = useLocation();
    const { t } = useTranslate();
    const [productCategory, setProductCategory] = useState({});
    const [productRegion, setProductRegion] = useState({});
    const [isProductFavorite, setIsProductFavorite] = useState(false);
    const [schemeIsLoaded, setSchemeIsLoaded] = useState(false);
    const [articleSet, dispatchArticles] = useReducer(articlesReducer, {});
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
            if (isEmpty(product)) return;
            const articles = [
                {
                    list: brandArticles,
                    category: "brand",
                    articleIdKey: "brand_article_id",
                    type: "set-brand-article"
                },
                {
                    list: grapeArticles,
                    category: "grape",
                    articleIdKey: "grape_article_id",
                    type: "set-grape-article"
                },
                {
                    list: regionArticles,
                    category: "region",
                    articleIdKey: "region_article_id",
                    type: "set-region-article"
                }
            ];

            articles.forEach(art => {
                if (art.list.length) {
                    const findedArticle = art.list.find(
                        f => f.id === product[art.articleIdKey]
                    );
                    dispatchArticles({
                        type: art.type,
                        payload: findedArticle
                            ? findedArticle
                            : getRandom(art.list)
                    });
                }
            });
        },
        [brandArticles, grapeArticles, regionArticles, product]
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

                if (strong.includes(slug)) {
                    const props = { ...strongProps };
                    if (slug === "vodka") delete props["aging"];
                    if (slug === "whiskey")
                        props["type"] = product[slug]["type"];
                    applyProps(props);
                }

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

        dispatch("cart/add", {
            product: { id, count },
            callback: _ =>
                notify({
                    text: getRandom(assistantPhrases[brandId])
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
