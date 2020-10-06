import React, { useState, useEffect } from "react";

import { Range } from "@/components/Input";
import Button from "@/components/Button";
import useTranslate from "@/utils/useTranslate";

import backdrop from "@/assets/images/catalog-advanced-filtering.png";

import "./advanced-filtering.scss";

const filtersList = [
    {
        min: "Сладкое",
        minSlug: "sweet",
        max: "Сухое",
        maxSlug: "suhoe",
        category: "sweetness"
    },
    {
        min: "Очень легкое",
        minSlug: "light-body",
        max: "Полнотелое",
        maxSlug: "full-body",
        category: "body"
    },
    {
        min: "Нейтральное",
        minSlug: "neutral",
        max: "Кислое",
        maxSlug: "acid",
        category: "acidity"
    }
];

function AdvancedFiltering({ onChange, onSubmit, active = {} }) {
    const { t } = useTranslate();
    return (
        <div className="advanced-filters">
            <img src={backdrop} alt="" className="backdrop" />
            <form className="advanced-filters__form">
                <h2 className="advanced-filters__title">
                    {t(
                        "we-will-find-the-perfect-wine-for-you",
                        "Мы подберем для вас идеальное вино!"
                    )}
                </h2>
                <div className="advanced-filters__submit">
                    <Button type="button" onClick={onSubmit}>
                        {t("select", "подобрать")}
                    </Button>
                </div>
                <div className="advanced-filters__fields-set">
                    {filtersList.map(
                        ({ min, minSlug, max, maxSlug, category }, i) => (
                            <div
                                className="advanced-filters__item filter-item"
                                key={i}
                            >
                                <div className="filter-item__min">
                                    {t(minSlug, min)}
                                </div>
                                <div className="filter-item__range">
                                    <Range
                                        min="1"
                                        max="4"
                                        value={
                                            active && active[category]
                                                ? active[category]
                                                : "1"
                                        }
                                        onChange={e => onChange(e, category)}
                                    />
                                </div>
                                <div className="filter-item__max">
                                    {t(maxSlug, max)}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </form>
        </div>
    );
}

export default AdvancedFiltering;
