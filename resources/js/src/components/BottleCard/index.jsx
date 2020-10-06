import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import IconButton from "@/components/IconButton";
import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";

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
    wineglass,
    bottle,
    backdrop = "",
    to,
    onAdd = Function.prototype
}) {
    const { isMobile } = useMeasures();
    const { t } = useTranslate();
    const onAddToCart = e => {
        e.stopPropagation();
        onAdd(e);
    };
    return (
        <article
            className={cn("bottle-card", {
                "bottle-card--slide-disabled": !wineglass
            })}
        >
            <div className="bottle-card__content">
                <div className="bottle-card__main">
                    {backdrop && (
                        <img
                            src={backdrop === "option1" ? grape : grain}
                            alt=""
                            className="backdrop"
                        />
                    )}
                    {!isMobile && wineglass && (
                        <div className="bottle-card__wineglass">
                            <img src={wineglass} alt="" />
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
                        <strong>{price}</strong> {t("rub", "руб.")}
                    </div>
                    <IconButton
                        className="bottle-card__buy"
                        onClick={onAddToCart}
                    >
                        <img src={cartGold} alt="" />
                    </IconButton>
                </div>
            </div>
        </article>
    );
}

export default BottleCard;
