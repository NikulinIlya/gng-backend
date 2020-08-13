import React, { useState, useEffect } from "react";

import IconButton from "@/components/IconButton";

import useCounter from "@/utils/useCounter";

import template from "@/assets/images/templates/cart-item-template.png";

import close from "@/assets/images/icons/close-gold.svg";

import "./cart-item.scss";

export default function CartContentsItem({
    name,
    brand,
    price,
    image,
    vendorCode,
    count = 1,
    onRemove,
    onCountChange = Function.prototype
}) {
    const { value, dispatch } = useCounter(count);
    useEffect(_ => onCountChange(value), [value]);
    return (
        <article className="cart-item">
            <section className="cart-item__product">
                <div className="cart-item__remove">
                    <IconButton onClick={onRemove}>
                        <img src={close} alt="" />
                    </IconButton>
                </div>
                <div className="cart-item__thumb">
                    <img src={image ? image : template} alt="" />
                </div>
                <div className="cart-item__info">
                    <h2 className="cart-item__name">{brand}</h2>
                    <p className="cart-item__descr">{name}</p>
                    <p className="cart-item__vendor-code">
                        Номер товара: {vendorCode}
                    </p>
                    <div className="cart-item__footer">
                        <div className="cart-item__sum">
                            <span className="cart-item__sum-label">
                                Количество
                            </span>
                            <div className="cart-item__counter-nav">
                                <button
                                    className="dec"
                                    onClick={_ => {
                                        dispatch("dec");
                                    }}
                                >
                                    -
                                </button>
                                <span>{value}</span>
                                <button
                                    className="inc"
                                    onClick={_ => dispatch("inc")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="cart-item__sum">
                            <span className="cart-item__sum-label">
                                Стоимость
                            </span>
                            <p className="cart-item__sum-value">
                                <span>{price}</span> руб.{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
