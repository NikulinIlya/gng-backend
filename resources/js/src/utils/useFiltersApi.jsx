import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";

const filterLabels = {
    categories: {
        name: "Тип напитка",
        nameSlug: "product-type"
    },
    brands: {
        name: "Бренд",
        nameSlug: "brand"
    },
    colours: {
        name: "Цвет",
        nameSlug: "colour"
    },
    grape_sorts: {
        name: "Сорт винограда",
        nameSlug: "grapes-variety"
    },
    locations: {
        name: "Регион",
        nameSlug: "region"
    }
};

export default function useApiState(slug) {
    const [labeledFilters, setLabeledFilters] = useState({});
    useEffect(_ => {
        if (!slug) throw new Error("Category slug is undefined");
        (async _ => {
            const isStrongCategory = slug === "strong";
            const url = isStrongCategory
                ? `/api/strong-drinks/filters`
                : `/api/product-categories-filters/${slug}`;

            const [err, response] = await to(redaxios(url));
            // console.log("FILTERS RESPONSE", response.data);
            const normalizedData = decorateFiltersWithLabels(response.data);
            setLabeledFilters(normalizedData);
        })();
    }, []);

    function decorateFiltersWithLabels(filters) {
        if (!filters) return [];
        return Object.entries(filters)
            .reverse()
            .reduce(
                (acc, [key, value]) => (
                    (acc[key] = {
                        value,
                        label: filterLabels[key].name,
                        labelSlug: filterLabels[key].nameSlug
                    }),
                    acc
                ),
                {}
            );
    }

    return labeledFilters;
}
