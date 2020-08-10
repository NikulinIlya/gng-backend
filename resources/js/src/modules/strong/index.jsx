import React, { useState, useEffect } from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import BottleCard from "@/components/BottleCard";
import Range from "@/components/Input/Range/Multiple";
import { Checkbox } from "@/components/Input";
import Filtering from "@/components/Filtering";
import compose from "@/utils/compose";

import withApi from "./hoc/withStrongApi";
import withLogic from "./hoc/withStrongLogic";

import "./strong.scss";

function Strong({ products, productCategories }) {
    console.log("productCategories", productCategories);
    return (
        <div className="strong container">
            <AsideLayout
                title={"Крепкие напитки"}
                renderAside={_ => (
                    <Filtering
                        renderFiltersBody={_ => (
                            <FiltersBody categories={productCategories} />
                        )}
                    />
                )}
            >
                <div className="strong__grid">
                    {products.map(
                        ({ id, name, price, glass_image, image, brand }) => (
                            <BottleCard
                                key={id}
                                name={name}
                                price={price}
                                wineglass={glass_image}
                                bottle={image}
                                brand={brand}
                                to={`/catalog/${id}`}
                            />
                        )
                    )}
                </div>
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
                <h3 className="filters-criteria__name">Напитки</h3>
                <div className="filters-criteria__fields">
                    <FilterBy criterias={categories} />
                </div>
            </div>
        </>
    );
}

export default compose(withApi, withLogic)(Strong);