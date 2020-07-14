import React, { useState, useEffect } from "react";

import CartItem from "@/components/CartContentsItem";
import Button from "@/components/Button";
import Disclaimer from "./components/Disclaimer";

import { history } from "@"

import "./cart.scss";

export default function Cart() {
  const [items, setItems] = useState([2805, 4900, 3600]);
  const onRemove = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div className="container">
      <section className="cart">
        <h1 className="cart__title">
          Ваша корзина {!items.length ? "пуста" : ""}
        </h1>
        {!!items.length && (
          <>
            <article className="cart__contents">
              {items.map((_, i) => (
                <CartItem price={_} key={i} onRemove={(_) => onRemove(i)} />
              ))}
            </article>
            <aside className="cart__nav">
              <div className="cart__side-container promo">
                <label className="promo__label">
                  <span>Промокод</span>
                  <input type="text" />
                </label>
                <button className="promo__button">Ок</button>
              </div>
              <div className="cart__side-container order">
                <h2 className="order__title">Ваш заказ</h2>
                <form className="order__form" onSubmit={_ => history.push('/cart/order')}>
                  <div className="order__line">
                    <span className="order__key">Товаров в корзине</span>
                    <span className="order__value">{items.length} шт</span>
                  </div>
                  <div className="order__line">
                    <span className="order__key">Всего</span>
                    <span className="order__value">
                      {items.reduce((acc, cur) => (acc += cur), 0)} руб.
                    </span>
                  </div>
                  <div className="order__line">
                    <span className="order__key">Итого</span>
                    <span className="order__value">
                      {items.reduce((acc, cur) => (acc += cur), 0)} руб.
                    </span>
                  </div>
                  <Button>Продолжить оформление</Button>
                </form>
              </div>
            </aside>
          </>
        )}
      </section>
      <Disclaimer />
    </div>
  );
}
