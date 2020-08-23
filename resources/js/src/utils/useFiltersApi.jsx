import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";

const filterLabels = {
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
            const url =
                slug === "strong"
                    ? `/api/strong-drinks/filters`
                    : `/api/product-categories-filters/${slug}`;

            const [err, response] = await to(redaxios(url));
            console.log("FILTERS RESPONSE", response.data);
            setLabeledFilters(decorateFiltersWithLabels(response.data));
        })();
    }, []);

    function decorateFiltersWithLabels(filters) {
        if (!filters) return [];
        return Object.entries(filters).reduce(
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
