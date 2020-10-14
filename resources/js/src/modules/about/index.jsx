import React, { useState, useEffect } from "react";

import DetailsCard from "@/components/DetailsPageCard";
import Post from "@/modules/news/components/Post";
import Modal from "@/components/Modal";

import { history } from "@";
import useTranslate from "@/utils/useTranslate";
import isEmpty from "@/utils/is-empty";

import withApi from "./hoc/withApi";

import banner from "@/assets/images/templates/about-banner.png";
import logo from "@/assets/images/about-logo.svg";

import template from "@/assets/images/templates/about-info-image.png";
import template2 from "@/assets/images/templates/about-info-image-2.png";
import signTemplate from "@/assets/images/templates/sign.png";
import wineSet from "@/assets/images/templates/wine-set.png";
import grape from "@/assets/images/bg_grape.svg";

import "./about.scss";

function About({ articles, currentArticle }) {
    const { t } = useTranslate();
    const [numberKeys, setNumberKeys] = useState("");
    const [numberValues, setNumberValues] = useState("");
    useEffect(_ => {
        const scheme = t("about-scheme", "");
        if (!scheme) return;
        const res = scheme.split("|");
        setNumberKeys(res[0]);
        setNumberValues(res[1]);
    });
    return (
        <div className="about-page">
            <div className="about-page__banner">
                <img src={banner} alt="" className="about-page__backdrop" />
                <section className="about-page__banner-content container">
                    <div className="about-page__logo">
                        <img src={logo} alt="" />
                    </div>
                    <h1 className="about-page__title">Grapes & Grains</h1>
                    {/* <p className="about-page__subtitle">
            Magna id proident sunt laborum esse nostrud mollit minim laboris
            duis culpa ex minim. Esse pariatur duis laboris mollit do laboris
            anim
          </p> */}
                </section>
            </div>
            <div className="about-page__numbers">
                <div className="container">
                    <ul className="numbers">
                        {numberKeys.split(",").map((itm, i) => (
                            <li className="numbers__item" key={i}>
                                <span className="numbers__item-value">
                                    {itm}
                                </span>
                                <span className="numbers__item-key">
                                    {numberValues.split(",")[i]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <div className="about-page__info-block">
        <div className="container">
          <div className="info-block">
            <div className="info-block__image">
              <img src={template} alt="" />
            </div>
            <div className="info-block__content">
              <h2 className="info-block__title">Magna id proident sunt</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                quia consequuntur magni dolores eos qui ratione dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </div> */}
            <div
                className="about-page__info-block"
                style={{ backgroundColor: "#f8f8f8" }}
            >
                <div className="container">
                    <div className="info-block" style={{ paddingBottom: 0 }}>
                        <div className="info-block__content">
                            <h2 className="info-block__title">
                                {t(
                                    "edward-seymour-johnson-founder-and-ceo",
                                    "Edward Seymour Johnson, Founder & CEO"
                                )}
                            </h2>
                            <p>
                                {t(
                                    "gng-grapes-and-grains-is-a-niche-start-up-wines-and-spirits-company-our-focus-is-to-offer-our-customers-quality-products-that-will-delight-any-table-gng-supports-an-environmental-social-and-governance-ethos",
                                    'GNG ("Grapes & Grains") is a niche start-up wines & spirits company. Our focus is to offer our customers quality products that will delight any table. GNG supports an Environmental, Social and Governance ethos.'
                                )}
                            </p>
                        </div>
                        <div className="info-block__image">
                            <img src={grape} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-page__cards">
                <div className="container">
                    <div className="cards">
                        {articles &&
                            articles.length &&
                            articles.map(({ main_image, name, text, id }) => (
                                <DetailsCard
                                    image={main_image}
                                    title={name}
                                    description={text}
                                    link={`?article=${id}`}
                                    key={id}
                                />
                            ))}
                    </div>
                </div>
            </div>
            {!isEmpty(currentArticle) && (
                <Modal onClose={_ => history.push(location.pathname)}>
                    <Post
                        title={currentArticle.name}
                        descr={currentArticle.text}
                        mainImage={currentArticle.main_image}
                    />
                </Modal>
            )}
        </div>
    );
}

export default withApi(About);
