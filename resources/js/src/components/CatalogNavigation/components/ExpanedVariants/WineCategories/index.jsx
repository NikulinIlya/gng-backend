import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Loading from "@/components/Loading";
import useTranslate from "@/utils/useTranslate";

import withLogic from "./hoc/withWineCategoriesLogic";

import "./wine-categories.scss";

function WineCategories({ onChangeState, filters, isLoaded }) {
    const { brands, grape_sorts, locations, colours, budget } = filters;
    const { t } = useTranslate();
    if (!isLoaded) return <Loading />;
    return (
        <>
            <div className="wine-categories">
                <div className="wine-categories__col">
                    <CategoryList
                        {...brands}
                        category="brands"
                        onClick={_ => onChangeState(false)}
                    />
                </div>
                <div className="wine-categories__col">
                    <CategoryList
                        {...locations}
                        nameProp="country"
                        category="locations"
                        onClick={_ => onChangeState(false)}
                    />
                </div>
                <div className="wine-categories__col">
                    <CategoryList
                        {...grape_sorts}
                        category="grape_sorts"
                        onClick={_ => onChangeState(false)}
                    />
                </div>
                <div className="wine-categories__col wine-categories__col--multirow">
                    <CategoryList
                        {...colours}
                        category="colours"
                        onClick={_ => onChangeState(false)}
                    />
                    <CategoryList
                        {...budget}
                        isExotic
                        onClick={_ => onChangeState(false)}
                    />
                </div>
            </div>
            <div className="wine-categories__all">
                <Button to="/wines" onClick={_ => onChangeState(false)}>
                    {t("view-full-selection", "Показать все вина")}
                </Button>
            </div>
        </>
    );
}

function CategoryList({
    label,
    labelSlug,
    value = [],
    nameProp = "name",
    category,
    isExotic,
    onClick
}) {
    const { t } = useTranslate();
    return (
        <section className="wine-category">
            <h4 className="wine-category__name">{t(labelSlug, label)}</h4>
            <ul className="wine-category__list">
                {value.map((item, i) => (
                    <li className="wine-category__item" key={i}>
                        <Link
                            to={`/wines${
                                isExotic
                                    ? item.query
                                    : `?${category}[]=${item.id}`
                            }`}
                            onClick={onClick}
                        >
                            {item[nameProp]}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default withLogic(WineCategories);
