import React, { useState, useEffect } from "react";

import CartItem from "@/components/CartContentsItem";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Disclaimer from "./components/Disclaimer";

import withApi from "./hoc/withCartApi";
import withLogic from "./hoc/withCartLogic";

import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";
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
    const { t } = useTranslate();

    return (
        <div className="container">
            <section className="cart">
                <h1 className="cart__title">
                    {!products.length && isLoaded
                        ? t("cart-is-empty", "Ваша корзина пуста")
                        : t("your-basket", "Ваша корзина")}
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
                                        product_category_id,
                                        brand,
                                        id
                                    }) => {
                                        const product =
                                            productsInCart.find(
                                                p => p.id === id
                                            ) || {};

                                        return (
                                            <CartItem
                                                price={price}
                                                vendorCode={vendor_code}
                                                name={name}
                                                brand={
                                                    product_category_id === 13
                                                        ? t(
                                                              "promotion",
                                                              "Специальное предложение"
                                                          )
                                                        : brand
                                                }
                                                image={image}
                                                onRemove={_ => onRemove(id)}
                                                unit={product.unit}
                                                count={product.count}
                                                onCountChange={value =>
                                                    onCountChange(id, value)
                                                }
                                                key={id}
                                            />
                                        );
                                    }
                                )
                            ) : (
                                <Loading />
                            )}
                        </article>
                        <aside className="cart__nav">
                            <div className="cart__side-container promo">
                                <label className="promo__label">
                                    <span>{t("promo-code", "Промокод")}</span>
                                    <input type="text" />
                                </label>
                                <button className="promo__button">
                                    {t("ok", "Ок")}
                                </button>
                            </div>
                            <div className="cart__side-container order">
                                <h2 className="order__title">
                                    {t("your-order", "Ваш заказ")}
                                </h2>
                                <form
                                    className="order__form"
                                    onSubmit={_ => history.push("/cart/order")}
                                >
                                    <div className="order__line">
                                        <span className="order__key">
                                            {t(
                                                "items-in-the-basket",
                                                "Товаров в корзине"
                                            )}
                                        </span>
                                        <span className="order__value">
                                            {cartSize} шт
                                        </span>
                                    </div>
                                    <div className="order__line">
                                        <span className="order__key">
                                            {t("inall", "Всего")}
                                        </span>
                                        <span className="order__value">
                                            {cartSum} {t("rub", "руб.")}
                                        </span>
                                    </div>
                                    <div className="order__line">
                                        <span className="order__key">
                                            {t("total", "Итого")}
                                        </span>
                                        <span className="order__value">
                                            {cartSum} {t("rub", "руб.")}
                                        </span>
                                    </div>
                                    <Button>
                                        {t(
                                            "further-processing",
                                            "Продолжить оформление"
                                        )}
                                    </Button>
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
