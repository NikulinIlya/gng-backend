import React, { useState, useEffect } from "react";

import Slider from "./components/Slider";
import Banner from "./components/BannerCard";

import Heading from "@/components/Heading";
import BottleCard from "@/components/BottleCard";
import DetailsCard from "@/components/DetailsPageCard";

import useMeasures from "@/utils/useMeasures";

import { discounts, contacts } from "./static";
import brands from "@/modules/brands/static";

import map from "@/assets/images/contacts-map.png";
import mobileMap from "@/assets/images/contacts-mobile-map.png";

import "./home.scss";

export default function HomePage() {
  const { isMobile } = useMeasures();
  return (
    <div className="home-page">
      <div className="home-page__slider">
        <Slider />
      </div>
      <section className="popular container">
        <Heading className="popular__heading ">Популярное</Heading>
        <div className="popular__body">
          {Array.from({ length: 4 }).map((_, i) => (
            <BottleCard key={i} />
          ))}
        </div>
      </section>
      <section className="home-banner">
        <Banner />
      </section>
      <section className="discounts container">
        <Heading className="popular__heading ">Акции и Предложения</Heading>
        <div className="discounts__body">
          {discounts.map((item, i) => (
            <DetailsCard {...item} key={i} />
          ))}
        </div>
      </section>
      <section className="contacts container">
        <Heading className="contacts__heading">Контакты</Heading>
        <div className="contacts__body">
          {contacts.map((item, i) => (
            <div className="contact-item" key={i}>
              <div className="contact-item__icon">
                <img src={item.icon} alt="" />
              </div>
              <h3 className="contact-item__name">{item.name}</h3>
              <p className="contact-item__value">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="map">
        <img src={isMobile ? mobileMap : map} alt="" className="map-image" />
      </div>
      <div className="home-brands">
        <ul className="home-brands__list">
          {brands.map(({ logo, name }) => (
            <li className="home-brands__item" key={name}>
              <img src={logo} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}