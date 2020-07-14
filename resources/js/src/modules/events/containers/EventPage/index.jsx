import React, { useState, useEffect } from "react";

import ProductCounter from "@/components/ProductCounter";
import ProductFeature from "@/components/ProductFeature";
import Heading from "@/components/Heading";

import imageTemplate from "@/assets/images/templates/event-image-template.png";

import "./event-page.scss";

export default function EventPage() {
  return (
    <div className="event-page">
      <div className="container">
        <div className="event-page__details">
          <div className="event-page__image">
            <img src={imageTemplate} alt="" />
          </div>
          <div className="event-page__info event-info">
            <h1 className="event-info__name">Spice Night</h1>
            <p className="event-info__place">Hyatt Petrovskiy Park</p>
            <p className="event-info__date">14 июня 2020 / 19:00</p>
            <p className="event-info__description">
              Join us in the Pickering Cellar for our Introduction to Wine
              Course. You will learn about wine over six Tuesday evenings. The
              series begins by looking at the factors that influence the balance
              of wine, learning about alcohol, tannins, acidity, aroma and
              flavour, and how to describe wine, as well as spotting levels
            </p>
            <div className="event-calc">
              <ProductCounter
                title="Бронирование мест"
                price={5500}
                label={(_) => <span className="event-calc__label">стоимость за 1 человека</span>}
              />
            </div>
          </div>
        </div>
        <div className="event-page__additional">
          <Heading>О мероприятии</Heading>
          <ul className="event-page__char-list">
            {[
              { name: "Производитель", value: "Cloudy Bay", icon: "flag" },
              {
                name: "Регион",
                value: "Новая Зеландия, Мальборо",
                icon: "marker",
              },
              {
                name: "Lorem Ipsum",
                value: "8 - 10°C",
                icon: "wineglass",
              },
              { name: "Виноград", value: "Sauvignon Blanc", icon: "grape" },
            ].map((f, i) => (
              <li className="event-page__char-item char-item" key={i}>
                <ProductFeature {...f} />
              </li>
            ))}
          </ul>
        </div>
        <div className="event-page__thumbs">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="event-page__thumbs-item" key={i}>
              <img
                src={require(`@/assets/images/templates/event-page-${++i}.png`)}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
