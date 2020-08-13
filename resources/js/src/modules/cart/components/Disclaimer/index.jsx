import React, { useState, useEffect } from "react";

import useTranslate from "@/utils/useTranslate";

import "./disclaimer.scss";

export default function Disclaimer() {
    const { t } = useTranslate();
    return (
        <div className="cart-footer">
            <p className="cart-disclaimer">
                В соответствии с Постановлением Правительства РФ от 27.09.2007 N
                612 (ред. от 30.11.2019) «Об утверждении Правил продажи товаров
                дистанционным способом» мы не продаем алкогольную продукцию
                онлайн.
            </p>
            <p className="cart-line">
                Ваш заказ вы можете забрать по адресу:{" "}
                {t(
                    "g-moskva-ul-seleznevskaya-dom-19-2",
                    "г. Москва,  ул. Селезневская , дом 19/2"
                )}
            </p>
            <p className="cart-line">
                По вопросам оформления заказа вы можете связаться с нами по
                телефону: 8 (982) 655-50-00
            </p>
        </div>
    );
}
