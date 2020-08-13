import React, { useState, useEffect } from "react";

import CartItem from "@/components/CartContentsItem";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Disclaimer from "./components/Disclaimer";

import withApi from "./hoc/withCartApi";
import withLogic from "./hoc/withCartLogic";

import compose from "@/utils/compose";

import { history } from "@";

import "./cart.scss";

function Cart({
    products,
    productsInCart,
    cartSize,
    cartSum,
    isLoaded,
    onRemove,
    onCountChange
}) {
    return (
        <div className="container">
            <section className="cart">
                <h1 className="cart__title">
                    Ваша корзина {!products.length && isLoaded ? "пуста" : ""}
                </h1>
                {!!products.length && (
                    <>
                        <article className="cart__contents">
                            {isLoaded ? (
                                products.map(
                                    ({
                                        name,
                                        price,
                                        image,
                                        vendor_code,
                                        brand,
                                        id
                                    }) => (
                                        <CartItem
                                            price={price}
                                            vendorCode={vendor_code}
                                            name={name}
                                            brand={brand}
                                            image={image}
                                            onRemove={_ => onRemove(id)}
                                            count={
                                                productsInCart.find(
                                                    p => p.id === id
                                                )
                                                    ? productsInCart.find(
                                                          p => p.id === id
                                                      ).count
                                                    : undefined
                                            }
                                            onCountChange={value =>
                                                onCountChange(id, value)
                                            }
                                            key={id}
                                        />
                                    )
                                )
                            ) : (
                                <Loading />
                            )}
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
                                <form
                                    className="order__form"
                                    onSubmit={_ => history.push("/cart/order")}
                                >
                                    <div className="order__line">
                                        <span className="order__key">
                                            Товаров в корзине
                                        </span>
                                        <span className="order__value">
                                            {cartSize} шт
                                        </span>
                                    </div>
                                    <div className="order__line">
                                        <span className="order__key">
                                            Всего
                                        </span>
                                        <span className="order__value">
                                            {cartSum} руб.
                                        </span>
                                    </div>
                                    <div className="order__line">
                                        <span className="order__key">
                                            Итого
                                        </span>
                                        <span className="order__value">
                                            {cartSum} руб.
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

export default compose(withApi, withLogic)(Cart);
