import React, { useState, useEffect } from "react";

import Filtering from "@/components/Filtering";
import Button from "@/components/Button";
import Range from "@/components/Input/Range/Multiple";
import { Checkbox } from "@/components/Input";

export default function AsideFiltering({
    filtersVisibility,
    visibilityHandler,
    filters
}) {
    const onClose = _ => visibilityHandler(false);
    const onOpen = _ => visibilityHandler(true);
    
    if (!filtersVisibility)
        return (
            <Button className="filters-handler" onClick={onOpen}>
                Фильтры
            </Button>
        );

    return (
        <Filtering
            onClose={onClose}
            renderFiltersBody={_ => <FiltersBody filters={filters} />}
        />
    );
}

function FilterBy({ criterias = [], propName = "name" }) {
    return criterias.map((cr, i) => <Checkbox label={cr[propName]} key={i} />);
}

function FiltersBody({ filters }) {
    const isLocationCriteria = key => key === "locations";
    return (
        <>
            <div className="filters-criteria">
                <h3 className="filters-criteria__name">Цена</h3>
                <div className="filters-criteria__fields">
                    <Range defaultRange={[30, 55]} />
                </div>
            </div>
            {Object.entries(filters).map(([key, filterItem]) => (
                <div className="filters-criteria" key={key}>
                    <h3 className="filters-criteria__name">
                        {filterItem.label}
                    </h3>
                    <div className="filters-criteria__fields">
                        <FilterBy
                            criterias={filterItem.value}
                            propName={
                                isLocationCriteria(key) ? "country" : "name"
                            }
                        />
                    </div>
                </div>
            ))}
        </>
    );
}
