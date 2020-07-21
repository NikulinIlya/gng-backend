import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreon } from "storeon/react";

import Burger from "../BurgerButton";

import useTranslate from "@/utils/useTranslate";

import "./inline.scss";

function InlineMode({
    items = [],
    isExpanded,
    onChangeState,
    onChangeVariant
}) {
    const { t } = useTranslate();
    const onSelect = (e, path) => {
        if (path === "/wine") {
            e.preventDefault();
            onChangeState(true);
            onChangeVariant("wine");
        }
    };
    const onBurgerClick = _ => {
        if (isExpanded) {
            onChangeState(!isExpanded);
        } else {
            onChangeState(!isExpanded);
            onChangeVariant("common");
        }
    };

    return (
        <div className="catalog-nav">
            <div className="catalog-nav__burger">
                <Burger onClick={onBurgerClick} state={isExpanded} />
            </div>
            <nav className="catalog-nav__set">
                {items.map(({ slug, name, path }, i) => (
                    <li className="catalog-nav__item" key={i}>
                        <Link to={path} onClick={e => onSelect(e, path)}>
                            {t(slug, name)}
                        </Link>
                    </li>
                ))}
            </nav>
        </div>
    );
}

export default InlineMode;
