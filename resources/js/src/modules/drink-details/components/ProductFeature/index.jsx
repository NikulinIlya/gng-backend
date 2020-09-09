import React, { useState, useEffect } from "react";

import flag from "@/assets/images/icons/flag-icon-gold.svg";
import marker from "@/assets/images/icons/marker-icon-gold.svg";
import grape from "@/assets/images/icons/grape-icon-gold.svg";
import wineglass from "@/assets/images/icons/wine-glass-icon-gold.svg";
import color from "@/assets/images/icons/color-icon-gold.svg";
import bottle from "@/assets/images/icons/bottle-icon-gold.svg";

import barrel from "@/assets/images/icons/product-details/aging.svg";
import star from "@/assets/images/icons/product-details/class.svg";
import spoon from "@/assets/images/icons/product-details/dosage.svg";
import spica from "@/assets/images/icons/product-details/raw.svg";
import cognacTaste from "@/assets/images/icons/product-details/taste-cognac.svg";
import vodkaTaste from "@/assets/images/icons/product-details/taste-vodka.svg";
import whiskeyTaste from "@/assets/images/icons/product-details/taste-whiskey.svg";

import "./product-feature.scss";

function ProductFeature({ icon = "", name = "", value = "" }) {
    const preset = {
        flag,
        marker,
        grape,
        wineglass,
        color,
        bottle,

        barrel,
        star,
        spoon,
        spica,
        cognacTaste,
        vodkaTaste,
        whiskeyTaste
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
