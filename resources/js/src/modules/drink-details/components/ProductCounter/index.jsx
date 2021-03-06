import React, { useState, useEffect } from "react";
import cn from "classnames";

import ProductCounter from "@/components/ProductCounter";
import useTranslate from "@/utils/useTranslate";
import UNIT from "@/utils/product-unit";

export default function Counter({
    price = 1,
    defaultCount,
    countIn,
    available = 1,
    labelVisibility = true,
    setCountIn,
    onAdd,
}) {
    const { t } = useTranslate();
    return (
        <div className={cn("details-counter", { "not-available": !available })}>
            <ProductCounter
                price={price}
                defaultCount={defaultCount}
                onAdd={onAdd}
                title={t("purchasing-options", "Варианты покупки")}
                label={_ => labelVisibility && (
                    <div className="product__calc-tabs tabs">
                        <label className="tabs__item">
                            <input
                                checked={countIn === UNIT.thing}
                                name="unit"
                                type="radio"
                                readOnly
                                // onChange={_ => setCountIn(UNIT.thing)}
                                className="visually-hidden"
                            />
                            <span>{t("bottles", "бутылки")}</span>
                        </label>
                        {/* <label className="tabs__item">
                        <input
                            checked={countIn === UNIT.case}
                            name="unit"
                            type="radio"
                            onChange={_ => setCountIn(UNIT.case)}
                            className="visually-hidden"
                        />
                        <span>{t("cases", "ящики (6 бутылок)")}</span>
                    </label> */}
                    </div>
                )}
            />
        </div>
    );
}
