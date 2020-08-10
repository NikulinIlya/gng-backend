import React, { useState, useEffect } from "react";

import ProductFeature from "./components/ProductFeature";
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

function ProductDetails({ product, isLoaded }) {
    if (!isLoaded) return <Loading />;
    return (
        <div className="container">
            <article className="product-details">
                <div className="product-details__thumb">
                    <div className="backdrop">
                        <img src={backdrop} alt="" />
                    </div>
                    <div className="product-details__bottle-img">
                        <img
                            src={product.image ? product.image : bottleImage}
                            alt=""
                        />
                    </div>
                </div>
                <section className="product-details__content">
                    <div className="product-details__common">
                        <h1 className="product-details__name">
                            {product.brand}
                        </h1>
                        <p className="product-details__descr">{product.name}</p>
                        <p className="product-details__vendor-code">
                            {`Номер товара: ${product.vendor_code}`}
                        </p>
                    </div>
                    <div className="product-details__features">
                        {[
                            {
                                name: "Производитель",
                                value: "Cloudy Bay",
                                icon: "flag"
                            },
                            {
                                name: "Регион",
                                value: "Новая Зеландия, Мальборо",
                                icon: "marker"
                            },
                            {
                                name: "Виноград",
                                value: "Sauvignon Blanc",
                                icon: "grape"
                            },
                            {
                                name: "Температура подачи",
                                value: "8 - 10°C",
                                icon: "wineglass"
                            },
                            {
                                name: "Цвет",
                                value: "Белое",
                                icon: "color"
                            },
                            {
                                name: "Крепость",
                                value: "13.5 %",
                                icon: "bottle"
                            }
                        ].map((f, i) => (
                            <ProductFeature {...f} key={i} />
                        ))}
                    </div>
                    <div className="product__calc">
                        <Counter price={product.price} />
                    </div>
                </section>
                <div className="product-details__about">
                    {product.product_category_id === 1 && (
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
                        {[
                            {
                                title: "Гастрономические сочетания",
                                content:
                                    "Вино хорошо подходит к блюдам из рыбы и морепродуктов, его можно подавать к овощным салатам.",
                                icon: fishIcon
                            },
                            {
                                title: "Сочетания с сыром",
                                content:
                                    "Dolor sunt occaecat dolor excepteur commodo deserunt culpa ullamco elit in ad laboris exercitation nisi.",
                                icon: cheeseIcon
                            }
                        ].map((r, i) => (
                            <section className="relative-card" key={i}>
                                <div className="relative-card__content">
                                    <h3 className="relative-card__title">
                                        {r.title}
                                    </h3>
                                    <p className="relative-card__descr">
                                        {r.content}
                                    </p>
                                </div>
                                <div className="relative-card__icon">
                                    <img src={r.icon} alt="" />
                                </div>
                            </section>
                        ))}
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

function Counter({ price = 1 }) {
    return (
        <ProductCounter
            price={price}
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
