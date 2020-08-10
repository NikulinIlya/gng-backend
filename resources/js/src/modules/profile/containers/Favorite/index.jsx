import React, { useState, useEffect } from "react";

import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";

import compose from "@/utils/compose";

import withApi from "./hoc/withFavoriteApi";
import withLogic from "./hoc/withFavoriteLogic";

import "./favorite.scss";

function Favorite({ isLoaded, isListEmpty, favoriteProducts }) {
    console.log("isListEmpy", isListEmpty);
    if (!isLoaded) return <Loading />;
    if (isListEmpty) return <h1 style={{ textAlign: "center" }}>Список пуст</h1>;
    return (
        <div className="favorite">
            <div className="container">
                <div className="favorite__list">
                    {favoriteProducts.map((p, i) => (
                        <BottleCard
                            name={p.name}
                            brand={p.brand}
                            price={p.price}
                            to={`/catalog/${p.id}`}
                            key={p.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(Favorite);
