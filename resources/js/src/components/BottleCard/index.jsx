import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import IconButton from "@/components/IconButton";
import useMeasures from "@/utils/useMeasures";

import bottleTemplate from "@/assets/images/templates/template-bottle.png";
import glassTemplate from "@/assets/images/wineglass-template.png";
import grain from "@/assets/images/bg_spica.svg";
import grape from "@/assets/images/bg_grape.svg";

import cartGold from "@/assets/images/icons/cart-gold.svg";

import "./bottle-card.scss";

function BottleCard({
    name,
    brand = "Cloudy Bay",
    price,
    wineglass = glassTemplate,
    bottle,
    useBackdrop = "",
    to
}) {
    const { isMobile } = useMeasures();
    return (
        <article className="bottle-card">
            <div className="bottle-card__content">
                <div className="bottle-card__main">
                    {useBackdrop && (
                        <img src={grape} alt="" className="backdrop" />
                    )}
                    {!isMobile && (
                        <div className="bottle-card__wineglass">
                            <img
                                src={wineglass ? wineglass : glassTemplate}
                                alt=""
                            />
                        </div>
                    )}
                    <div className="bottle-card__bottle">
                        <img src={bottle ? bottle : bottleTemplate} alt="" />
                    </div>
                </div>
                <section className="bottle-card__info">
                    <h2 className="bottle-card__name">
                        <Link to={to}>{brand}</Link>
                    </h2>
                    <p className="bottle-card__details">{name}</p>
                </section>
                <div className="bottle-card__footer">
                    <div className="bottle-card__price">
                        <strong>{price}</strong> руб.
                    </div>
                    <IconButton
                        className="bottle-card__buy"
                        onClick={e => e.stopPropagation()}
                    >
                        <img src={cartGold} alt="" />
                    </IconButton>
                </div>
            </div>
        </article>
    );
}

export default BottleCard;
