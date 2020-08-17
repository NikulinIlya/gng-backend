import React, { useState, useEffect } from "react";

import ProductFeature from "./components/ProductFeature";
import FavButton from "./components/FavoriteButton";
import ProductCounter from "@/components/ProductCounter";
import Progress from "@/components/Progress";
import DetailsCard from "@/components/DetailsPageCard";
import Loading from "@/components/Loading";

import withApi from "./hoc/withApi";
import withLogic from "./hoc/withLogic";

import compose from "@/utils/compose";

import bottleImage from "@/assets/images/templates/product-details-bottle.png";
import backdrop from "@/assets/images/templates/details-backdrop.png";
import template1 from "@/assets/images/templates/sauvignon.png";
import template2 from "@/assets/images/templates/grape.png";
import template3 from "@/assets/images/templates/land.png";

import fishIcon from "@/assets/images/icons/fish-icon-gold.svg";
import cheeseIcon from "@/assets/images/icons/cheese-icon-gold.svg";

import "./product-details.scss";

const detailsIcons = {
    brand: "flag",
    region: "marker",
    grape_sorts: "grape",
    temperature: "wineglass",
    color: "color",
    strength: "bottle"
};

function ProductDetails({
    product,
    brands = [],
    flatRegionImages,
    productDetails,
    productCategory,
    isLoaded,
    isProductFavorite,
    onFavoriteStateChange,
    onAdd
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
                        <img src={flatRegionImages[brands.find(b => b.id === brand_id).location_id]} alt="" />
                    </div>
                    <div className="product-details__bottle-img">
                        <img src={image ? image : bottleImage} alt="" />
                    </div>
                </div>
                <section className="product-details__content">
                    <div className="product-details__common">
                        <h1 className="product-details__name">
                            {productDetails["brand"].value}
                        </h1>
                        <p className="product-details__descr">{name}</p>
                        <p className="product-details__vendor-code">
                            {`Номер товара: ${vendor_code}`}
                        </p>
                    </div>
                    <div className="product-details__features">
                        {Object.entries(
                            productDetails
                        ).map(([key, instance]) => (
                            <ProductFeature
                                icon={detailsIcons[key]}
                                name={instance.name}
                                value={instance.value}
                                key={key}
                            />
                        ))}
                    </div>
                    <div className="product__calc">
                        <Counter
                            defaultCount={1}
                            price={price}
                            onAdd={val => onAdd(id, val)}
                        />
                    </div>
                </section>
                <div className="product-details__about">
                    {productCategory.slug === "wine" && (
                        <>
                            <h2 className="product-details__about-title">
                                <span>Об этом вине</span>
                            </h2>
                            <div className="product-details__criterias">
                                {["Сладость", "Тело", "Кислотность"].map(
                                    (c, i) => (
                                        <Progress label={c} key={i} />
                                    )
                                )}
                            </div>
                        </>
                    )}
                    <div className="product-details__relative">
                        <section className="relative-card" >
                            <div className="relative-card__content">
                                <h3 className="relative-card__title">
                                    Гастрономические сочетания
                                    </h3>
                                <p className="relative-card__descr">
                                    {product[productCategory.slug].recommendations}
                                </p>
                            </div>
                            <div className="relative-card__icon">
                                <img src={fishIcon} alt="" />
                            </div>
                        </section>
                        <section className="relative-card" >
                            <div className="relative-card__content">
                                <h3 className="relative-card__title">
                                    Сочетания с сыром
                                    </h3>
                                <p className="relative-card__descr">
                                    {product[productCategory.slug].cheese}
                                </p>
                            </div>
                            <div className="relative-card__icon">
                                <img src={cheeseIcon} alt="" />
                            </div>
                        </section>
                    </div>
                    <div className="product-details__more-info">
                        {[
                            {
                                image: template1,
                                title: "Cloudy Bay",
                                description: `Cloudy Bay was established by David Hohnen, of Cape Mentelle fame, in 1985. Cloudy Bay takes its name from `
                            },
                            {
                                image: template2,
                                title: "Cloudy Bay",
                                description: `Cloudy Bay was established by David Hohnen, of Cape Mentelle fame, in 1985. Cloudy Bay takes its name from `
                            },
                            {
                                image: template3,
                                title: "Cloudy Bay",
                                description: `Cloudy Bay was established by David Hohnen, of Cape Mentelle fame, in 1985. Cloudy Bay takes its name from `
                            }
                        ].map((c, i) => (
                            <DetailsCard {...c} key={i} />
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}

function Counter({ price = 1, defaultCount, onAdd }) {
    return (
        <ProductCounter
            price={price}
            defaultCount={defaultCount}
            onAdd={onAdd}
            title="Варианты покупки"
            label={_ => (
                <div className="product__calc-tabs tabs">
                    <label className="tabs__item">
                        <input
                            defaultChecked
                            name="unit"
                            type="radio"
                            className="visually-hidden"
                        />
                        <span>бутылки</span>
                    </label>
                    <label className="tabs__item">
                        <input
                            name="unit"
                            type="radio"
                            className="visually-hidden"
                        />
                        <span>ящики (6 бутылок)</span>
                    </label>
                </div>
            )}
        />
    );
}

export default compose(withApi, withLogic)(ProductDetails);
