import React, { useState, useEffect, useContext } from "react";

import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import AsideLayout from "@/components/Layouts/AsideLayout";
import AsideFiltering from "@/components/AsideFiltering";

import AdvancedFilters from "./components/AdvancedFiltering";

import { withApi, withLogic, withFiltering } from "./hoc";

import compose from "@/utils/compose";

import "./wines.scss";

const CatalogPage = ({
    isLoaded,
    products,
    filters,
    filtersVisibility,
    handleFiltersVisibility,
    onAdd
}) => {
    return (
        <div className="catalog">
            <div className="container">
                <AdvancedFilters />
                <AsideLayout
                    renderAside={_ => (
                        <AsideFiltering
                            filters={filters}
                            filtersVisibility={filtersVisibility}
                            visibilityHandler={handleFiltersVisibility}
                        />
                    )}
                >
                    {isLoaded ? (
                        <div className="catalog-grid">
                            {products.map(
                                ({ id, image, glass_image, ...restProps }) => (
                                    <BottleCard
                                        wineglass={glass_image}
                                        bottle={image}
                                        to={`/catalog/${id}`}
                                        onAdd={_ => onAdd(id)}
                                        key={id}
                                        {...restProps}
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

export default compose(withApi, withLogic, withFiltering)(CatalogPage);
