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

const strongLabels = {
    strong: {
        label: "Тип напитка",
        value: [
            {
                name: "Коньяк",
                id: 1
            },
            {
                name: "Водка",
                id: 1
            },
            {
                name: "Виски",
                id: 1
            },
            {
                name: "Ликёр",
                id: 1
            },
        ]
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
            const normalizedData = isStrongCategory
                ? {
                      ...strongLabels,
                      ...decorateFiltersWithLabels(response.data)
                  }
                : decorateFiltersWithLabels(response.data);
            setLabeledFilters(normalizedData);
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

    console.log("labeledFilters", labeledFilters);

    return labeledFilters;
}
