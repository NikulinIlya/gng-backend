import React, { useState, useEffect } from "react";

import IconButton from "@/components/IconButton";

import template from "@/assets/images/templates/cart-item-template.png";

import close from "@/assets/images/icons/close-gold.svg";

import "./cart-item.scss";

export default function CartContentsItem({ price, onRemove }) {
  return (
    <article className="cart-item">
      <section className="cart-item__product">
        <div className="cart-item__remove">
          <IconButton onClick={onRemove}>
            <img src={close} alt="" />
          </IconButton>
        </div>
        <div className="cart-item__thumb">
          <img src={template} alt="" />
        </div>
        <div className="cart-item__info">
          <h2 className="cart-item__name">Cloudy Bay</h2>
          <p className="cart-item__descr">Sauvignon Blanc, Marlborough, 2014</p>
          <p className="cart-item__vendor-code">Номер товара: 4859066</p>
          <div className="cart-item__footer">
            <div className="cart-item__sum">
              <span className="cart-item__sum-label">Количество</span>
              <div className="cart-item__counter-nav">
                <button className="dec">-</button>
                <span>1</span>
                <button className="inc">+</button>
              </div>
            </div>
            <div className="cart-item__sum">
              <span className="cart-item__sum-label">Стоимость</span>
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
