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

import withApi from "./hoc/withWineApi";
import withLogic from "./hoc/withWineLogic";

import compose from "@/utils/compose";

import "./wines.scss";

const CatalogPage = ({
    isLoaded,
    isMobile,
    products,
    filtersVisibility,
    handleFiltersVisibility
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
                                renderFiltersBody={() => <FiltersBody />}
                                onClose={handleFiltersVisibility(false)}
                            />
                        </aside>
                    )}
                >
                    {isLoaded ? (
                        <div className="catalog-grid">
                            {products.map(({ product, brand, id }) => (
                                <BottleCard
                                    name={product.name}
                                    price={product.price}
                                    wineglass={product.glass_image}
                                    bottle={product.image}
                                    brand={brand}
                                    to={`/catalog/${product.id}`}
                                    key={id}
                                />
                            ))}
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

function FiltersBody() {
    const { brands, colors, regions, sorts } = useStoreon(
        "brands",
        "colors",
        "regions",
        "sorts"
    );
    return (
        <>
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
                <h3 className="filters-criteria__name">Сорт винограда</h3>
                <div className="filters-criteria__fields">
                    <FilterBy criterias={sorts ? sorts : []} />
                </div>
            </div>
        </>
    );
}

export default compose(withApi, withLogic)(CatalogPage);
