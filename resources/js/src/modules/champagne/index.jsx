import React, { useState, useEffect } from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import AsideFiltering from "@/components/AsideFiltering";

import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";

import { withApi, withLogic, withFiltering } from "./hoc";

import "./champagne.scss";

function Champagne({
    products,
    filters = [],
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
                    <AsideFiltering
                        filtersVisibility={filtersVisibility}
                        visibilityHandler={handleFiltersVisibility}
                        filters={filters}
                    />
                )}
            >
                {isLoaded ? (
                    <div className="champagne__grid">
                        {products.map(({ id, image, glass_image, ...rest }) => (
                            <BottleCard
                                wineglass={glass_image}
                                bottle={image}
                                to={`/catalog/${id}`}
                                onAdd={_ => onAdd(id)}
                                key={id}
                                {...rest}
                            />
                        ))}
                    </div>
                ) : (
                    <Loading />
                )}
            </AsideLayout>
        </div>
    );
}

export default compose(withApi, withLogic, withFiltering)(Champagne);
