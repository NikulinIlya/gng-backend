import React, { useState, useEffect, useContext } from "react";
import { useStoreon } from "storeon/react";

import BottleCard from "@/components/BottleCard";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Filtering from "@/components/Filtering";
import AsideLayout from "@/components/Layouts/AsideLayout";
import Range from "@/components/Input/Range/Multiple";
import { Checkbox } from "@/components/Input";

import AdvancedFilters from "./components/AdvancedFiltering";

import { withApi, withLogic, withFiltering } from "./hoc";

import compose from "@/utils/compose";

import "./wines.scss";

const CatalogPage = ({
    isLoaded,
    isMobile,
    products,
    filters,
    filtersVisibility,
    handleFiltersVisibility,
    onAdd
}) => {
    return (
        <div className="catalog">
            <div className="container">
                {isMobile && (
                    <div className="catalog-filters-handler">
                        <Button onClick={handleFiltersVisibility(true)}>
                            Фильтры
                        </Button>
                    </div>
                )}
                <AdvancedFilters />
                <AsideLayout
                    renderAside={_ => (
                        <aside hidden={!filtersVisibility}>
                            <Filtering
                                renderFiltersBody={() => (
                                    <FiltersBody filters={filters} />
                                )}
                                onClose={handleFiltersVisibility(false)}
                            />
                        </aside>
                    )}
                >
                    {isLoaded ? (
                        <div className="catalog-grid">
                            {products.map(
                                ({ product, brand, id, backdrop }) => (
                                    <BottleCard
                                        name={product.name}
                                        price={product.price}
                                        wineglass={product.glass_image}
                                        bottle={product.image}
                                        brand={brand}
                                        to={`/catalog/${product.id}`}
                                        onAdd={_ => onAdd(product.id)}
                                        backdrop={backdrop}
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
        </div>
    );
};

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

export default compose(withApi, withLogic, withFiltering)(CatalogPage);
