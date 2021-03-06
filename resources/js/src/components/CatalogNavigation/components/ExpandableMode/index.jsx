import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Burger from "../BurgerButton";
import useTranslate from "@/utils/useTranslate";

import "./expandable.scss";

function ExpandableMode({ items }) {
    const { t } = useTranslate();
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={`catalog-expandable ${isExpanded ? "expanded" : ""}`}>
            <div
                className="catalog-expandable__head"
                onClick={_ => setIsExpanded(!isExpanded)}
            >
                <h2 className="catalog-expandable__title">
                    {t("catalog", "Каталог")}
                </h2>
                <div className="catalog-expandable__burger">
                    <Burger state={isExpanded} />
                </div>
            </div>
            <div className="catalog-expandable__body" hidden>
                <nav className="catalog-expandable__set">
                    {items.map(({ slug, name, path }, i) => (
                        <li className="catalog-expandable__item" key={i}>
                            <Link to={path} onClick={_ => setIsExpanded(false)}>
                                {t(slug, name)}
                            </Link>
                        </li>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default ExpandableMode;
