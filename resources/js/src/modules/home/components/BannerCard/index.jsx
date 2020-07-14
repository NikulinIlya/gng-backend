import React, { useState, useEffect } from "react";

import bannerBackdrop from "@/assets/images/home-banner-card.png";

import "./banner-card.scss";

export default function BannerCard() {
  return (
    <article className="banner-card">
      <div className="banner-card__content">
        <img src={bannerBackdrop} alt="" className="banner-card__backdrop" />
        <section className="banner-card__info">
          <h3 className="banner-card__title">Exercitation Cillum</h3>
          <p className="banner-card__description">
            The series begins by looking at the factors that influence the
            balance of wine, learning about alcohol, tannins, acidity, aroma and
            flavour, and how to describe wine, as well as spotting levels
          </p>
          <a href="" className="banner-card__details-link">
            Подробнее
          </a>
        </section>
      </div>
    </article>
  );
}
