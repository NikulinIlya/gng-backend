import React, { useState, useEffect } from "react";

import AsideLayout from "@/components/Layouts/AsideLayout";
import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";

import compose from "@/utils/compose";

import withApi from "./hoc/withChampagneApi";
import withLogic from "./hoc/withChampagneLogic";

import "./champagne.scss";

function Champagne({ products, isLoaded }) {
    return (
        <div className="champagne container">
            <AsideLayout title="Шампанское и Игристое">
                {isLoaded ? (
                    <div className="champagne__grid">
                        {products.map(
                            ({
                                name,
                                price,
                                brand,
                                id,
                                image,
                                glass_image
                            }) => (
                                <BottleCard
                                    name={name}
                                    price={price}
                                    wineglass={glass_image}
                                    bottle={image}
                                    brand={brand}
                                    to={`/catalog/${id}`}
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

export default compose(withApi, withLogic)(Champagne);
