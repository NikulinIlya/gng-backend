import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import cardTemplate from "@/assets/images/templates/main-news-card-template.png";

import "./main-news-card.scss";

export default function MainNewsCard() {
  return (
    <article className="main-news-card">
      <section className="main-news-card__content">
        <img src={cardTemplate} alt="" className="main-news-card__backdrop" />
        <h2 className="main-news-card__title">
          <Link to="?post=some">Fugiat irure</Link>
        </h2>
        <p className="main-news-card__description">
          New Zealand's answer to Napa Valley, Marlborough is a veritable engine
          room that in 2006 accounted for 47 percent
        </p>
      </section>
    </article>
  );
}
