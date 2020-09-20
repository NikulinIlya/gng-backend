import React, { useState, useEffect, useContext } from "react";

import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import AsideLayout from "@/components/Layouts/AsideLayout";
import AsideFiltering from "@/components/AsideFiltering";
import Button from "@/components/Button";

import AdvancedFilters from "./components/AdvancedFiltering";

import { withApi, withLogic, withFiltering } from "./hoc";

import compose from "@/utils/compose";
import { status as REQUEST } from "@/utils/request-status";

import "./wines.scss";

const CatalogPage = ({
    status,
    lastPage,
    page,
    products,
    filters,
    filtersVisibility,
    handleFiltersVisibility,
    active,
    onAdd,
    onLoadMore,
    onFiltersChange,
    onFiltersSubmit,
    onFiltersReset
}) => {
    return (
        <div className="catalog">
            <div className="container">
                <AdvancedFilters />
                <AsideLayout
                    renderAside={_ => (
                        <AsideFiltering
                            filters={filters}
                            active={active}
                            onChange={onFiltersChange}
                            onSubmit={onFiltersSubmit}
                            onReset={onFiltersReset}
                            filtersVisibility={filtersVisibility}
                            visibilityHandler={handleFiltersVisibility}
                        />
                    )}
                >
                    {status === REQUEST.pending && <Loading />}
                    {status === REQUEST.success && (
                        <>
                            <div className="catalog-grid">
                                {products.map(
                                    ({
                                        id,
                                        image,
                                        glass_image,
                                        ...restProps
                                    }) => (
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
                            {page < lastPage && (
                                <div className="catalog-load">
                                    <Button onClick={onLoadMore}>
                                        Показать еще
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </AsideLayout>
            </div>
        </div>
    );
};

export default compose(withApi, withLogic, withFiltering)(CatalogPage);
