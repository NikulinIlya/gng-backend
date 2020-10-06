import React, { useState, useEffect } from "react";

import ProductCounter from "@/components/ProductCounter";
import useTranslate from "@/utils/useTranslate";

export default function Counter({
    price = 1,
    defaultCount,
    countIn,
    setCountIn,
    onAdd
}) {
    const { t } = useTranslate();
    return (
        <ProductCounter
            price={price}
            defaultCount={defaultCount}
            onAdd={onAdd}
            title={t("purchasing-options", "Варианты покупки")}
            label={_ => (
                <div className="product__calc-tabs tabs">
                    <label className="tabs__item">
                        <input
                            checked={countIn === "bottles"}
                            name="unit"
                            type="radio"
                            onChange={_ => setCountIn("bottles")}
                            className="visually-hidden"
                        />
                        <span>{t("bottles", "бутылки")}</span>
                    </label>
                    <label className="tabs__item">
                        <input
                            checked={countIn === "cases"}
                            name="unit"
                            type="radio"
                            onChange={_ => setCountIn("cases")}
                            className="visually-hidden"
                        />
                        <span>{t("cases", "ящики (6 бутылок)")}</span>
                    </label>
                </div>
            )}
        />
    );
}
