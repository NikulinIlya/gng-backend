import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Burger from "../BurgerButton";

import "./inline.scss";

function InlineMode({
  items = [],
  isExpanded,
  onChangeState,
  onChangeVariant,
}) {
  const onSelect = (e, path) => {
    if (path === "/wine") {
      e.preventDefault();
      onChangeState(true);
      onChangeVariant("wine");
    }
  };
  const onBurgerClick = (_) => {
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
        {items.map(({ name, path }, i) => (
          <li className="catalog-nav__item" key={i}>
            <Link to={path} onClick={(e) => onSelect(e, path)}>
              {name}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
}

export default InlineMode;
