import React, { useState, useEffect } from "react";

import useTranslate from "@/utils/useTranslate";

import "./disclaimer.scss";

export default function Disclaimer() {
    const { t } = useTranslate();
    return (
        <div className="cart-footer">
            <p className="cart-disclaimer">
                {t(
                    `pursuant-to-the-decree-of-the-government-of-the-russian-federation-of-september-27-2007-n-612-as-amended-on-november-30-2019-on-approval-of-the-rules-for-the-sale-of-goods-by-remote-means-we-do-not-sell-alcohol-beverages-online`,
                    `В соответствии с Постановлением Правительства РФ от 27.09.2007 N
                612 (ред. от 30.11.2019) «Об утверждении Правил продажи товаров
                дистанционным способом» мы не продаем алкогольную продукцию
                онлайн.`
                )}
            </p>
            <p className="cart-line">
                {t(
                    "you-can-pick-up-your-order-at",
                    " Ваш заказ вы можете забрать по адресу:"
                )}{" "}
                {t(
                    "g-moskva-ul-seleznevskaya-dom-19-2",
                    "г. Москва,  ул. Селезневская , дом 19/2"
                )}
            </p>
            <p className="cart-line">
                {t(
                    "for-questions-about-ordering-you-can-contact-us",
                    `По вопросам оформления заказа вы можете связаться с нами по
                телефону:`
                )}{" "}
                {t("7-982-655-50-00", "+7-982-655-50-00")}
            </p>
        </div>
    );
}
