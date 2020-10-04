import React, { useState, useEffect } from "react";

import Slider from "./components/Slider";
import Banner from "./components/BannerCard";
import BrandsSlider from "./components/BrandsSlider";

import Heading from "@/components/Heading";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import DetailsCard from "@/components/DetailsPageCard";

import { status as REQUEST } from "@/utils/request-status";
import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";
import usePopular from "./usePopular";

import { discounts, contacts } from "./static";

import map from "@/assets/images/templates/map1.jpg";
import mobileMap from "@/assets/images/contacts-map.jpg";

import "./home.scss";

function HomePage() {
    const { isMobile } = useMeasures();
    const { t } = useTranslate();
    const { products: popular, status } = usePopular();
    return (
        <div className="home-page">
            <div className="home-page__slider">
                <Slider />
            </div>
            <section className="popular container">
                <Heading className="popular__heading ">Популярное</Heading>
                {status === REQUEST.pending && <Loading />}
                {status === REQUEST.success && (
                    <div className="popular__body">
                        {popular.map((_, i) => (
                            <BottleCard
                                {..._}
                                bottle={_.image}
                                wineglass={_.glass_image}
                                to={`/catalog/${_.id}`}
                                key={i}
                            />
                        ))}
                    </div>
                )}
            </section>
            <section className="home-banner">
                <Banner />
            </section>
            {/* <section className="discounts container">
                <Heading className="popular__heading ">
                    Акции и Предложения
                </Heading>
                <div className="discounts__body">
                    {discounts.map((item, i) => (
                        <DetailsCard {...item} key={i} />
                    ))}
                </div>
            </section> */}
            <section className="contacts container">
                <Heading className="contacts__heading">Контакты</Heading>
                <div className="contacts__body">
                    {contacts.map((item, i) => (
                        <div className="contact-item" key={i}>
                            <div className="contact-item__icon">
                                <img src={item.icon} alt="" />
                            </div>
                            <h3 className="contact-item__name">{item.name}</h3>
                            <p className="contact-item__value">
                                {t(item.valueSlug, item.value)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <div className="map">
                <img
                    src={isMobile ? mobileMap : map}
                    alt=""
                    className="map-image"
                />
            </div>
            <div className="home-brands">
                <BrandsSlider />
            </div>
        </div>
    );
}

export default HomePage;
