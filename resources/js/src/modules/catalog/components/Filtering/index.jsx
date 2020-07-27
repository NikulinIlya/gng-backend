import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import Range from "@/components/Input/Range/Multiple";
import Checkbox from "@/components/Input/Checkbox";

import useMeasures from "@/utils/useMeasures";

import "./filters.scss";

function Filtering({ onClose }) {
    const { isMobile } = useMeasures();
    const { brands, colors, regions, sorts } = useStoreon(
        "brands",
        "colors",
        "regions",
        "sorts"
    );
    return (
        <article className="filters">
            <form>
                {isMobile && (
                    <div className="filters__head">
                        <button
                            className="filters__hide"
                            type="button"
                            onClick={onClose}
                        >
                            Скрыть фильтр
                        </button>
                    </div>
                )}
                <div className="filters__body">
                    <div className="filters-criteria">
                        <h3 className="filters-criteria__name">Цена</h3>
                        <div className="filters-criteria__fields">
                            <Range defaultRange={[30, 55]} />
                        </div>
                    </div>
                    <div className="filters-criteria">
                        <h3 className="filters-criteria__name">Бренды</h3>
                        <div className="filters-criteria__fields">
                            <FilterBy criterias={brands ? brands : []} />
                        </div>
                    </div>
                    <div className="filters-criteria">
                        <h3 className="filters-criteria__name">Цвет</h3>
                        <div className="filters-criteria__fields">
                            <FilterBy criterias={colors ? colors : []} />
                        </div>
                    </div>
                    <div className="filters-criteria">
                        <h3 className="filters-criteria__name">Регион</h3>
                        <div className="filters-criteria__fields">
                            <FilterBy
                                criterias={regions ? regions : []}
                                propName="country"
                            />
                        </div>
                    </div>

                    <div className="filters-criteria">
                        <h3 className="filters-criteria__name">
                            Сорт винограда
                        </h3>
                        <div className="filters-criteria__fields">
                            <FilterBy criterias={sorts ? sorts : []} />
                        </div>
                    </div>
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

function FilterBy({ criterias = [], propName = "name" }) {
    return criterias.map((cr, i) => <Checkbox label={cr[propName]} key={i} />);
}

export default Filtering;
