import React, { useState, useEffect } from "react";
import Range from "@/components/Input/Range/Multiple";
import Checkbox from "@/components/Input/Checkbox";

import useMeasures from "@/utils/useMeasures";

import "./filters.scss";

function Filtering({ onClose }) {
  const { isMobile } = useMeasures();
  return (
    <article className="filters">
      <form>
        {isMobile && (
          <div className="filters__head">
            <button className="filters__hide" type="button" onClick={onClose}>
              Скрыть фильтр
            </button>
          </div>
        )}
        <div className="filters__body">
          {["Цена", "Бренды", "Цвет", "Регион", "Сорт винограда"].map(
            (cr, i) => (
              <div className="filters-criteria" key={i}>
                <h3 className="filters-criteria__name">{cr}</h3>
                <div className="filters-criteria__fields">
                  {!i ? <Range defaultRange={[30,55]} /> : <Brands />}
                </div>
              </div>
            )
          )}
        </div>
        {isMobile && (
          <div className="filters__footer">
            <button className="filters__submit" onClick={onClose}>
              Применить
            </button>
            <button className="filters__reset" onClick={onClose}>
              Сбросить
            </button>
          </div>
        )}
      </form>
    </article>
  );
}

function Brands() {
  return ["Cloudy Bay", "Terrazas", "Terrazas"].map((ch, i) => (
    <Checkbox label={ch} key={i} />
  ));
}

export default Filtering;
