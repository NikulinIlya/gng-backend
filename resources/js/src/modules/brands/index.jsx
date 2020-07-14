import React, { useState, useEffect } from "react";

import Button from "@/components/Button";

import data from "./static";

import "./brands.scss";

export default function Brands() {
  return (
    <div className="container">
      <div className="brands__grid">
        {data.map((b, i) => (
          <div className="square-aspect-ratio-wrapper" key={i}>
            <div className="brands__item">
              <div className="brands__item-default-view">
                <img className="brands__item-logo" src={b.logo} alt="" />
                <img className="brands__item-map" src={b.map} alt="" />
              </div>

              <section className="brands__item-hovered-view" hidden>
                <h2 className="brands__item-name">{b.name}</h2>
                <p className="brands__item-country">{data[0].country}</p>
                <p className="brands__item-history">{data[0].history}</p>
                <Button>Продукция бренда</Button>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
