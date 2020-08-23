import React from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import AsideFiltering from "@/components/AsideFiltering";

import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";

import withApi from "./hoc/withStrongApi";
import withLogic from "./hoc/withStrongLogic";

import "./strong.scss";

function Strong({
    products,
    filters,
    filtersVisibility,
    isLoaded,
    onAdd,
    handleFiltersVisibility
}) {
    const { t } = useTranslate();

    return (
        <div className="strong container">
            <AsideLayout
                title={t("strong-alcohol", "Крепкие напитки")}
                renderAside={_ => (
                    <AsideFiltering
                        filtersVisibility={filtersVisibility}
                        filters={filters}
                        visibilityHandler={handleFiltersVisibility}
                    />
                )}
            >
                {isLoaded ? (
                    <div className="strong__grid">
                        {products.map(
                            ({ id, glass_image, image, ...restProps }) => (
                                <BottleCard
                                    key={id}
                                    wineglass={glass_image}
                                    bottle={image}
                                    to={`/catalog/${id}`}
                                    onAdd={_ => onAdd(id)}
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
    );
}

export default compose(withApi, withLogic)(Strong);
