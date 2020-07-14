import React, { useState, useEffect } from "react";

import Button from "@/components/Button";

import slideTemplate from "@/assets/images/templates/main-page-slider.png";

import "./slider.scss";

export default function Slider() {
  return (
    <div className="slider">
      <div className="slider__item">
        <img className="slider__item-backdrop" src={slideTemplate} alt="" />
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
  return (
    <section className="slider-card">
      <div className="slider-card__content">
        <h2 className="slider-card__title">Spice Night</h2>
        <p className="slider-card__descr">
          The series begins by looking at the factors that influence
        </p>
        <a className="slider-card__details">
          <Button>Подробнее</Button>
        </a>
      </div>
    </section>
  );
}
