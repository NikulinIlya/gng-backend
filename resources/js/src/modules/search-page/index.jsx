import React, { useState, useEffect } from "react";

import BottleCard from "@/components/BottleCard";
import Loading from "@/components/Loading";
import Heading from "@/components/Heading";
import NotFound, { Noop } from "@/components/NotFound";

import { withApi, withLogic } from "./hoc";

import compose from "@/utils/compose";
import { status as REQUEST } from "@/utils/request-status";
import useTranslate from "@/utils/useTranslate";

import "./search-page.scss";

const categoryLabels = {
    vintages: {
        name: "Винтажи",
        nameSlug: "vintages"
    },
    rares: {
        name: "Редкие",
        nameSlug: "rare"
    },
    bags: { name: "Сумки", nameSlug: "" },
    glasses: { name: "Бокалы", nameSlug: "" }
};

function SearchPage({
    status,
    products,
    query,
    brandId,
    category,
    brandNames
}) {
    const { t } = useTranslate();
    const announcedCats = ["14"];
    const [isAnnounced, setIsAnnounced] = useState(false);
    useEffect(_ => {
        const urlParams = new URLSearchParams(window.location.search);
        if (
            urlParams.has("brand_id") &&
            announcedCats.includes(urlParams.get("brand_id"))
        ) {
            setIsAnnounced(true);
        }
    }, []);
    return (
        <div className="container">
            <div className="search-page">
                {query && (
                    <h1 className="search-page__title">
                        Search results for "{query}"
                    </h1>
                )}
                {brandId && brandNames && (
                    <h1 className="search-page__title">
                        {t("search-for", "Поиск по ")} "{brandNames[brandId]}"
                    </h1>
                )}
                {category && categoryLabels[category] && (
                    <Heading className="search-page__title">
                        {t(
                            categoryLabels[category].nameSlug,
                            categoryLabels[category].name
                        )}
                    </Heading>
                )}
                <div className="search-page__results">
                    {status === REQUEST.pending && <Loading />}
                    {status === REQUEST.success &&
                        (products.length ? (
                            <div className="search-page__grid">
                                {products.map(
                                    ({ id, image, glass_image, ...rest }) => (
                                        <BottleCard
                                            to={`/catalog/${id}`}
                                            bottle={image}
                                            wineglass={glass_image}
                                            {...rest}
                                            key={id}
                                        />
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="search-page__empty-result">
                                {isAnnounced ? <Noop /> : <NotFound />}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(SearchPage);
