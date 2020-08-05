import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";

import data from "./static";

import "./wine-categories.scss";

const { brands, region, sort, color, budget } = data;

export default function WineCategories({ onChangeState }) {
    return (
        <>
            <div className="wine-categories">
                <div className="wine-categories__col">
                    <CategoryList {...brands} />
                </div>
                <div className="wine-categories__col">
                    <CategoryList {...region} />
                </div>
                <div className="wine-categories__col">
                    <CategoryList {...sort} />
                </div>
                <div className="wine-categories__col wine-categories__col--multirow">
                    <CategoryList {...color} />
                    <CategoryList {...budget} />
                </div>
            </div>
            <div className="wine-categories__all">
                <Link to="/wines">
                    <Button onClick={_ => onChangeState(false)}>
                        Показать все вина
                    </Button>
                </Link>
            </div>
        </>
    );
}

function CategoryList({ name, list = [] }) {
    return (
        <section className="wine-category">
            <h4 className="wine-category__name">{name}</h4>
            <ul className="wine-category__list">
                {list.map((item, i) => (
                    <li className="wine-category__item" key={i}>
                        <Link to="/catalog">{item}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
