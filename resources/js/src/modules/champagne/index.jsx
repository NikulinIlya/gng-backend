import React, { useState, useEffect } from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import Range from "@/components/Input/Range/Multiple";
import { Checkbox } from "@/components/Input";
import Filtering from "@/components/Filtering";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";


import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";

import withApi from "./hoc/withChampagneApi";
import withLogic from "./hoc/withChampagneLogic";

import "./champagne.scss";

function Champagne({ products, isLoaded, onAdd }) {
    const { t } = useTranslate();
    return (
        <div className="champagne container">
            <AsideLayout
                title={t("champagne-and-sparkling", "Шампанское и Игристое")}
                renderAside={_ => (
                    <Filtering
                        renderFiltersBody={_ => <FiltersBody categories={[]} />}
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

function FiltersBody({ categories }) {
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
                    <FilterBy criterias={categories} />
                </div>
            </div>
        </>
    );
}

export default compose(withApi, withLogic)(Champagne);
