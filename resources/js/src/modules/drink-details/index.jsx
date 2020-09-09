import React, { useState, useEffect } from "react";

import DetailsCard from "@/components/DetailsPageCard";
import Loading from "@/components/Loading";
import Post from "@/modules/news/components/Post";
import Modal from "@/components/Modal";

import compose from "@/utils/compose";

import {
    ProductFeature,
    ProductSuggestion,
    FavButton,
    Counter,
    AboutWine
} from "./components";

import { withApi, withLogic } from "./hoc";

import bottleImage from "@/assets/images/templates/product-details-bottle.png";

import "./product-details.scss";

const detailsIcons = {
    brand: "flag",
    region: "marker",
    grape_sorts: "grape",
    temperature: "wineglass",
    color: "color",
    strength: "bottle",
    dosage: "spoon",
    class: "star",
    aging: "flag",
    raw: "grape"
};

const vodka = {
    brand: "flag",
    raw: "spica",
    region: "marker",
    strength: "bottle",
    taste: "vodkaTaste"
};

const cognac = {
    aging: "barrel",
    brand: "flag",
    region: "marker",
    strength: "bottle",
    taste: "cognacTaste",
    class: "star"
};

const whiskey = {
    aging: "barrel",
    brand: "flag",
    region: "marker",
    strength: "bottle",
    type: "star",
    taste: "whiskeyTaste"
};

const champagne = {
    dosage: 'spoon',
}

const productIcons = {
    vodka,
    cognac,
    whiskey,
    common: detailsIcons
};

function ProductDetails({
    product,
    flatRegionImages,
    productDetails,
    productCategory,
    productRegion,
    articleSet,
    currentArticle,
    isLoaded,
    isProductFavorite,
    onFavoriteStateChange,
    onAdd,
    onHideArticle
}) {
    const { image, name, vendor_code, price, id, brand_id } = product;

    if (!isLoaded) return <Loading />;
    return (
        <div className="container">
            <article className="product-details">
                <div className="product-details__fav">
                    <FavButton
                        state={isProductFavorite}
                        onChange={onFavoriteStateChange}
                    />
                </div>
                <div className="product-details__thumb">
                    <div className="backdrop">
                        <img src={flatRegionImages[productRegion]} alt="" />
                    </div>
                    <div className="product-details__bottle-img">
                        <img src={image ? image : bottleImage} alt="" />
                    </div>
                </div>
                <section className="product-details__content">
                    <div className="product-details__common">
                        <h1 className="product-details__name">
                            {productDetails["brand"]
                                ? productDetails["brand"].value
                                : ""}
                        </h1>
                        <p className="product-details__descr">{name}</p>
                        <p className="product-details__vendor-code">
                            {`Номер товара: ${vendor_code}`}
                        </p>
                    </div>
                    <div className="product-details__features">
                        {Object.entries(productDetails).map(
                            ([key, instance]) => (
                                <ProductFeature
                                    icon={
                                        productIcons[productCategory.slug]
                                            ? productIcons[
                                                  productCategory.slug
                                              ][key]
                                            : productIcons["common"][key]
                                    }
                                    name={instance.name}
                                    value={instance.value}
                                    key={key}
                                />
                            )
                        )}
                    </div>
                    <div className="product__calc">
                        <Counter
                            defaultCount={1}
                            price={price}
                            onAdd={val => onAdd(id, val, brand_id)}
                        />
                    </div>
                </section>
                <div className="product-details__about">
                    {productCategory.slug === "wine" && (
                        <AboutWine
                            acidity={product[productCategory.slug].acidity}
                            acidity={product[productCategory.slug].sweetness}
                            acidity={product[productCategory.slug].body}
                        />
                    )}
                    {productCategory.slug && (
                        <div className="product-details__relative">
                            <ProductSuggestion
                                variant="combination"
                                text={
                                    product[productCategory.slug]
                                        .recommendations
                                }
                            />
                            <ProductSuggestion
                                variant="cheese"
                                text={product[productCategory.slug].cheese}
                            />
                        </div>
                    )}

                    <div className="product-details__more-info">
                        {articleSet.brand && (
                            <DetailsCard
                                image={articleSet.brand.main_image}
                                title={articleSet.brand.name}
                                description={articleSet.brand.text}
                                link={`?article=brand`}
                            />
                        )}
                        {articleSet.grape && (
                            <DetailsCard
                                image={articleSet.grape.main_image}
                                title={articleSet.grape.name}
                                description={articleSet.grape.text}
                                link={`?article=grape`}
                            />
                        )}
                        {articleSet.region && (
                            <DetailsCard
                                image={articleSet.region.main_image}
                                title={articleSet.region.name}
                                description={articleSet.region.text}
                                link={`?article=region`}
                            />
                        )}
                        {currentArticle && (
                            <Modal onClose={onHideArticle}>
                                <Post
                                    title={articleSet[currentArticle].name}
                                    descr={articleSet[currentArticle].text}
                                    mainImage={
                                        articleSet[currentArticle].main_image
                                    }
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}

export default compose(withApi, withLogic)(ProductDetails);
