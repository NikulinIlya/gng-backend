import React, { useState, useEffect, useContext } from "react";

import BottleCard from "@/components/BottleCard";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import AsideLayout from "@/components/Layouts/AsideLayout";

import AdvancedFilters from "./components/AdvancedFiltering";
import Filtering from "./components/Filtering";

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
                                onClose={handleFiltersVisibility(false)}
                            />
                        </aside>
                    )}
                >
                    {isLoaded ? (
                        <div className="catalog-grid">
                            {products.map(({ name, price, brand }, i) => (
                                <BottleCard
                                    name={name}
                                    price={price}
                                    brand={brand}
                                    key={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </AsideLayout>
                {/* <div className="container-grid">
                    <aside hidden={!filtersVisibility}>
                        <Filtering onClose={handleFiltersVisibility(false)} />
                    </aside>
                    {isLoaded ? (
                        <div className="catalog-grid">
                            {products.map(({ name, price, brand }, i) => (
                                <BottleCard
                                    name={name}
                                    price={price}
                                    brand={brand}
                                    key={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default compose(withApi, withLogic)(CatalogPage);
