import React, { useState, useEffect } from "react";

import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";

import compose from "@/utils/compose";
import useTranslate from "@/utils/useTranslate";

import withApi from "./hoc/withFavoriteApi";
import withLogic from "./hoc/withFavoriteLogic";

import "./favorite.scss";

function Favorite({ isLoaded, isListEmpty, favoriteProducts }) {
    const { t } = useTranslate();
    if (!isLoaded) return <Loading />;
    if (isListEmpty)
        return (
            <h1 style={{ textAlign: "center" }}>
                {t("your-list-is-empty", "Список пуст")}
            </h1>
        );
    return (
        <div className="favorite">
            <div className="container">
                <div className="favorite__list">
                    {favoriteProducts.map((p, i) => (
                        <BottleCard
                            wineglass={p.glass_image}
                            bottle={p.image}
                            name={p.name}
                            brand={p.brand}
                            backdrop={p.backdrop}
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
