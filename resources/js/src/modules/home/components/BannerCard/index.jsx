import React, { useState, useEffect } from "react";

import useTranslate from "@/utils/useTranslate";

import bannerBackdrop from "@/assets/images/templates/discount.png";

import "./banner-card.scss";

export default function BannerCard() {
    const { t } = useTranslate();
    return (
        <article className="banner-card">
            <div className="banner-card__content">
                <img
                    src={bannerBackdrop}
                    alt=""
                    className="banner-card__backdrop"
                />
                <section className="banner-card__info">
                    <h3 className="banner-card__title">
                        {t(
                            "ardbeg-wee-beastie-5-years",
                            "Ardbeg Wee Beastie - 5 лет"
                        )}
                    </h3>
                    <p className="banner-card__description">
                        {t(
                            "wee-is-a-scottish-adjective-which-means-small-little-a-beastie-is-a-creature-usually-small-and-often-with-attitude-beyond-its-size-in-this-instance-the-wee-beastie-is-in-fact-the-whisky-itself-only-5-years-old-yet-incredibly-powerful-with-a-formidable-bite",
                            "«Wee» – это прилагательное в шотландском языке, которое означает «маленький». «Beastie» – это существо, обычно маленькое и часто с «повадками», превосходящими его размеры. В данном случае «Wee Beastie» – это фактически воплощение самого виски. При возрасте всего 5 лет он уже проявляет невероятно мощный характер с внушительным «укусом»."
                        )}
                    </p>
                    <a href="" className="banner-card__details-link">
                        {t("learn-more", "подробнее")}
                    </a>
                </section>
            </div>
        </article>
    );
}
