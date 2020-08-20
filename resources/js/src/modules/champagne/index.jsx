import React, { useState, useEffect } from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import Range from "@/components/Input/Range/Multiple";
import { Checkbox } from "@/components/Input";
import Filtering from "@/components/Filtering";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import Button from "@/components/Button";

import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";

import { withApi, withLogic, withFiltering } from "./hoc";

import "./champagne.scss";

function Champagne({
    products,
    filters,
    isLoaded,
    filtersVisibility,
    onAdd,
    handleFiltersVisibility
}) {
    const { t } = useTranslate();

    return (
        <div className="champagne container">
            <AsideLayout
                title={t("champagne-and-sparkling", "Шампанское и Игристое")}
                renderAside={_ => (
                    <Aside
                        filtersVisibility={filtersVisibility}
                        visibilityHandler={handleFiltersVisibility}
                        filters={filters}
                    />
                )}
            >
                {isLoaded ? (
                    <div className="champagne__grid">
                        {products.map(
                            ({
                                name,
                                price,
                                brand,
                                id,
                                image,
                                glass_image,
                                backdrop
                            }) => (
                                <BottleCard
                                    name={name}
                                    price={price}
                                    wineglass={glass_image}
                                    bottle={image}
                                    brand={brand}
                                    backdrop={backdrop}
                                    to={`/catalog/${id}`}
                                    onAdd={_ => onAdd(id)}
                                    key={id}
                                />
                            )
                        )}
                    </div>
                ) : (
                    <Loading />
                )}
            </AsideLayout>
        </div>
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

function Aside({ filtersVisibility, visibilityHandler, filters }) {
    const onClose = _ => visibilityHandler(false);
    const onOpen = _ => visibilityHandler(true);

    if (!filtersVisibility) return <Button onClick={onOpen}>Фильтры</Button>;
    
    return (
        <Filtering
            onClose={onClose}
            renderFiltersBody={_ => <FiltersBody filters={filters} />}
        />
    );
}

export default compose(withApi, withLogic, withFiltering)(Champagne);
