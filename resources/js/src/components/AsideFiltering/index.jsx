import React, { useState, useEffect } from "react";

import Filtering from "@/components/Filtering";
import Button from "@/components/Button";
import Range from "@/components/Input/Range/Multiple";
import { Checkbox } from "@/components/Input";
import useTranslate from "@/utils/useTranslate";

export default function AsideFiltering({
    filtersVisibility,
    visibilityHandler,
    filters,
    active,
    onChange,
    onSubmit,
    onReset
}) {
    const onClose = _ => visibilityHandler(false);
    const onOpen = _ => visibilityHandler(true);
    const {t} = useTranslate()

    if (!filtersVisibility)
        return (
            <Button className="filters-handler" onClick={onOpen}>
                {t('filters','Фильтры')}
            </Button>
        );

    return (
        <Filtering
            onClose={onClose}
            onSubmit={onSubmit}
            onReset={onReset}
            renderFiltersBody={_ => (
                <FiltersBody
                    filters={filters}
                    active={active}
                    onChange={onChange}
                />
            )}
        />
    );
}

function FilterBy({
    criterias = [],
    active = {},
    category,
    propName = "name",
    onChange
}) {
    return criterias.map((cr, i) => {
        const isChecked =
            active[category] && active[category].includes(cr.id + "");
        const getLabel = propName => {
            const isLocation = propName === "country";
            return !isLocation
                ? cr[propName]
                : cr[propName] === cr.region
                ? cr[propName]
                : `${cr[propName]} (${cr.region})`;
        };
        return (
            <Checkbox
                label={getLabel(propName)}
                onChange={_ => onChange(cr.id + "")}
                checked={!!isChecked}
                key={i}
            />
        );
    });
}

function FiltersBody({ filters, active, onChange }) {
    const { t } = useTranslate();
    const getPropName = key => (key === "locations" ? "country" : "name");
    return (
        <>
            <div className="filters-criteria">
                <h3 className="filters-criteria__name">{t("price", "Цена")}</h3>
                <div className="filters-criteria__fields">
                    <Range
                        min={1000}
                        max={100000}
                        defaultRange={[
                            +active["price_min"] || 1000,
                            +active["price_max"] || 100000
                        ]}
                        onChange={value => onChange(value, "price")}
                    />
                </div>
            </div>
            {Object.entries(filters).map(([key, filterItem]) => (
                <div className="filters-criteria" key={key}>
                    <h3 className="filters-criteria__name">
                        {t(filterItem.labelSlug, filterItem.label)}
                    </h3>
                    <div className="filters-criteria__fields">
                        <FilterBy
                            criterias={filterItem.value}
                            active={active}
                            category={key}
                            propName={getPropName(key)}
                            onChange={e => onChange(e, key)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}
