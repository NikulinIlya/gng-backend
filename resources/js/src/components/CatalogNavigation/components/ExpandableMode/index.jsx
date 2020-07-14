import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Burger from "../BurgerButton";

import "./expandable.scss";

function ExpandableMode({ items }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`catalog-expandable ${isExpanded ? "expanded" : ""}`}>
      <div className="catalog-expandable__head">
        <h2 className="catalog-expandable__title">Каталог</h2>
        <div className="catalog-expandable__burger">
          <Burger
            onClick={(_) => setIsExpanded(!isExpanded)}
            state={isExpanded}
          />
        </div>
      </div>
      <div className="catalog-expandable__body" hidden>
        <nav className="catalog-expandable__set">
          {items.map(({ name, path }, i) => (
            <li className="catalog-expandable__item" key={i}>
              <Link to={path} onClick={(_) => setIsExpanded(false)}>
                {name}
              </Link>
            </li>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ExpandableMode;
