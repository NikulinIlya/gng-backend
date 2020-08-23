import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Loading from "@/components/Loading";

import withLogic from "./hoc/withWineCategoriesLogic";

import "./wine-categories.scss";

function WineCategories({ onChangeState, filters, isLoaded }) {
    const { brands, grape_sorts, locations, colours, budget } = filters;
    if (!isLoaded) return <Loading />;
    return (
        <>
            <div className="wine-categories">
                <div className="wine-categories__col">
                    <CategoryList {...brands} />
                </div>
                <div className="wine-categories__col">
                    <CategoryList {...locations} nameProp="country" />
                </div>
                <div className="wine-categories__col">
                    <CategoryList {...grape_sorts} />
                </div>
                <div className="wine-categories__col wine-categories__col--multirow">
                    <CategoryList {...colours} />
                    <CategoryList {...budget} />
                </div>
            </div>
            <div className="wine-categories__all">
                <Button to="/wines" onClick={_ => onChangeState(false)}>
                    Показать все вина
                </Button>
            </div>
        </>
    );
}

function CategoryList({ label, value = [], nameProp = "name" }) {
    return (
        <section className="wine-category">
            <h4 className="wine-category__name">{label}</h4>
            <ul className="wine-category__list">
                {value.map((item, i) => (
                    <li className="wine-category__item" key={i}>
                        <Link to="/wines">{item[nameProp]}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default withLogic(WineCategories);
