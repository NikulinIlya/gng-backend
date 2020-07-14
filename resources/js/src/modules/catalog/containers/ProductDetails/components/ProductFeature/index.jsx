import React, { useState, useEffect } from "react";

import flag from "@/assets/images/icons/flag-icon-gold.svg";
import marker from "@/assets/images/icons/marker-icon-gold.svg";
import grape from "@/assets/images/icons/grape-icon-gold.svg";
import wineglass from "@/assets/images/icons/wine-glass-icon-gold.svg";
import color from "@/assets/images/icons/color-icon-gold.svg";
import bottle from "@/assets/images/icons/bottle-icon-gold.svg";

import './product-feature.scss'

function ProductFeature({ icon = "", name = "", value = "" }) {
  const preset = {
    flag,
    marker,
    grape,
    wineglass,
    color,
    bottle,
  };
  return (
    <section className="feature-item">
      <div className="feature-item__icon">
        <img src={preset[icon] ? preset[icon] : icon} alt="" />
      </div>
      <div className="feature-item__info">
        <h3 className="feature-item__name">{name}</h3>
        <div className="feature-item__value">{value}</div>
      </div>
    </section>
  );
}

export default ProductFeature;
