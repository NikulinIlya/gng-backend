import React from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import AsideFiltering from "@/components/AsideFiltering";
import Button from "@/components/Button";
import EmptyList from "@/components/EmptyList";

import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";
import { status as REQUEST } from "@/utils/request-status";

import { withApi, withLogic, withFiltering } from "./hoc";

import "./champagne.scss";

function Champagne({
    products,
    filters = [],
    status,
    page,
    active,
    lastPage,
    filtersVisibility,
    onAdd,
    handleFiltersVisibility,
    onLoadMore,
    onFiltersChange,
    onFiltersSubmit,
    onFiltersReset
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
                        active={active}
                        onChange={onFiltersChange}
                        onSubmit={onFiltersSubmit}
                        onReset={onFiltersReset}
                    />
                )}
            >
                {status === REQUEST.pending && <Loading fixed />}
                {status === REQUEST.success && !!!products.length && (
                    <EmptyList />
                )}
                {(status === REQUEST.success || !!products.length) && (
                    <>
                        <div className="champagne__grid">
                            {products.map(
                                ({ id, image, glass_image, ...rest }) => (
                                    <BottleCard
                                        wineglass={glass_image}
                                        bottle={image}
                                        to={`/catalog/${id}`}
                                        onAdd={_ => onAdd(id)}
                                        key={id}
                                        {...rest}
                                    />
                                )
                            )}
                        </div>

                        {page < lastPage && !!products.length && (
                            <div className="catalog-load">
                                <Button onClick={onLoadMore}>
                                    {t("show-more", "Показать еще")}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </AsideLayout>
        </div>
    );
}

export default compose(withApi, withLogic, withFiltering)(Champagne);
