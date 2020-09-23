import React, { useState, useEffect } from "react";

import { Range } from "@/components/Input";
import Button from "@/components/Button";

import backdrop from "@/assets/images/catalog-advanced-filtering.png";

import "./advanced-filtering.scss";

function AdvancedFiltering({ onChange, onSubmit, active = {} }) {
    return (
        <div className="advanced-filters">
            <img src={backdrop} alt="" className="backdrop" />
            <form className="advanced-filters__form">
                <h2 className="advanced-filters__title">
                    Мы подберем для вас идеальное вино!
                </h2>
                <div className="advanced-filters__submit">
                    <Button type="button" onClick={onSubmit}>
                        подобрать
                    </Button>
                </div>
                <div className="advanced-filters__fields-set">
                    {/* {console.log("active!!!!!!", active)} */}
                    {[
                        { min: "Сладкое", max: "Сухое", category: "sweetness" },
                        {
                            min: "Очень легкое",
                            max: "Полнотелое",
                            category: "body"
                        },
                        {
                            min: "Нейтральное",
                            max: "Кислое",
                            category: "acidity"
                        }
                    ].map(({ min, max, category }, i) => (
                        <div
                            className="advanced-filters__item filter-item"
                            key={i}
                        >
                            <div className="filter-item__min">{min}</div>
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
                            <div className="filter-item__max">{max}</div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default AdvancedFiltering;
