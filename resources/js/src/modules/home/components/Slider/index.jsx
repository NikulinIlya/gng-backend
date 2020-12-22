import React, { useState, useEffect } from "react";

import Button from "@/components/Button";
import useTranslate from "@/utils/useTranslate";

import slideTemplate from "@/assets/images/templates/christmas.png";

import "./slider.scss";

export default function Slider() {
    return (
        <div className="slider">
            <div className="slider__item">
                <img
                    className="slider__item-backdrop"
                    src={slideTemplate}
                    alt=""
                />
                <div className="slider__item-content container">
                    <div className="slider__item-card">
                        <SliderCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SliderCard() {
    const { t } = useTranslate();
    return (
        <section className="slider-card">
            <div className="slider-card__content">
                <h2 className="slider-card__title">
                    {t("hennessy-x-o-150-anniversary", "Специальное предложение")}
                </h2>
                <p className="slider-card__descr">
                    {t(
                        "the-odyssey-has-just-begun",
                        "Только этой осенью"
                    )}
                </p>

                <Button to="/catalog/197?_view=promotion">{t("learn-more", "подробнее")}</Button>
            </div>
        </section>
    );
}
