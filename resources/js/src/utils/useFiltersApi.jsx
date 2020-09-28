import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";

const filterLabels = {
    categories: {
        name: "Тип напитка"
    },
    brands: {
        name: "Бренд",
        nameSlug: ""
    },
    colours: {
        name: "Цвет",
        nameSlug: ""
    },
    grape_sorts: {
        name: "Сорт винограда",
        nameSlug: ""
    },
    locations: {
        name: "Регион",
        nameSlug: ""
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
        return Object.entries(filters).reverse().reduce(
            (acc, [key, value]) => (
                (acc[key] = {
                    value,
                    label: filterLabels[key].name
                }),
                acc
            ),
            {}
        );
    }

    return labeledFilters;
}
