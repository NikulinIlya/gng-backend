import React, { useState, useEffect } from "react";

import { Range } from "@/components/Input";
import Button from "@/components/Button"

import backdrop from "@/assets/images/catalog-advanced-filtering.png";

import "./advanced-filtering.scss";

function AdvancedFiltering() {
  return (
    <div className="advanced-filters">
      <img src={backdrop} alt="" className="backdrop" />
      <form className="advanced-filters__form">
        <h2 className="advanced-filters__title">
          Мы подберем для вас идеальное вино!
        </h2>
        <div className="advanced-filters__submit">
          <Button>подобрать</Button>
        </div>
        <div className="advanced-filters__fields-set">
          {[
            { min: "Сладкое", max: "Сухое" },
            { min: "Очень легкое", max: "Полнотелое" },
            { min: "Нейтральное", max: "Кислое" },
          ].map(({ min, max }, i) => (
            <div className="advanced-filters__item filter-item" key={i}>
              <div className="filter-item__min">{min}</div>
              <div className="filter-item__range">
                <Range />
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
