import React, { useState, useEffect } from "react";

import DetailsCard from "@/components/DetailsPageCard";

import banner from "@/assets/images/templates/about-banner.png";
import logo from "@/assets/images/about-logo.svg";

import template from "@/assets/images/templates/about-info-image.png";
import template2 from "@/assets/images/templates/about-info-image-2.png";
import signTemplate from "@/assets/images/templates/sign.png";
import wineSet from "@/assets/images/templates/wine-set.png";

import "./about.scss";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-page__banner">
        <img src={banner} alt="" className="about-page__backdrop" />
        <section className="about-page__banner-content container">
          <div className="about-page__logo">
            <img src={logo} alt="" />
          </div>
          <h1 className="about-page__title">
            Magna id proident laborum esse nostrud
          </h1>
          <p className="about-page__subtitle">
            Magna id proident sunt laborum esse nostrud mollit minim laboris
            duis culpa ex minim. Esse pariatur duis laboris mollit do laboris
            anim
          </p>
        </section>
      </div>
      <div className="about-page__numbers">
        <div className="container">
          <ul className="numbers">
            {Array.from({ length: 3 }).map((itm, i) => (
              <li className="numbers__item" key={i}>
                <span className="numbers__item-value">12</span>
                <span className="numbers__item-key">pariatur incididunt</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="about-page__info-block">
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
      </div>
      <div
        className="about-page__info-block"
        style={{ backgroundColor: "#f8f8f8" }}
      >
        <div className="container">
          <div className="info-block" style={{ paddingBottom: 0 }}>
            <div className="info-block__content">
              <h2 className="info-block__title">
                Reprehenderit anim cupidatat ullamco
              </h2>
              <p>
                Magna id proident sunt laborum esse nostrud mollit minim laboris
                duis culpa ex minim. Esse pariatur duis laboris mollit do
                laboris anim ea ea amet veniam qui. Aute culpa eiusmod culpa
                excepteur consectetur dolore non voluptate nostrud minim sint
                quis. Ullamco exercitation et sint eu laboris.
              </p>
              <img src={signTemplate} alt="" />
            </div>
            <div className="info-block__image">
              <img src={template2} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="about-page__cards">
        <div className="container">
          <div className="cards">
            {Array.from({ length: 3 }).map((_, i) => (
              <DetailsCard
                image={wineSet}
                title={"Aute occaecat"}
                description={`An important white grape in Bordeaux and the Loire Valley that has now found fame in New Zealand and now Chile. `}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
