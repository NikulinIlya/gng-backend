import React, { useEffect, useState } from "react";

import useQueryParams from "@/utils/useQueryParams";

const specialWineFilters = ["sweetness", "body", "acidity"];

export default WrappedComponent => props => {
    const { wineStateDispatcher, filters, history } = props;
    const [activeFilters, setActiveFilters] = useState({});
    const { params, buildQuery, normalizeQueryParams } = useQueryParams();

    useEffect(
        _ => {
            if (params) {
                // merge all allowed param keys for current category
                const allowedFilters = [
                    ...Object.keys(filters),
                    ...specialWineFilters
                ];

                // filter urlParams for only allowed list
                const filteredParams = normalizeQueryParams(
                    params,
                    allowedFilters
                );

                // build query string from filtered params
                const normalizedQuery = buildQuery(filteredParams);

                // dispatch normalized query string
                wineStateDispatcher({
                    type: "set-query",
                    payload: normalizedQuery
                });

                // dispatch new page if existing
                if (params["page"] && !isNaN(params["page"]))
                    wineStateDispatcher({
                        type: "set-cur-page",
                        payload: +params["page"]
                    });
            }
        },
        [params, filters]
    );

    useEffect(
        _ => {
            if (params) setActiveFilters(params);
        },
        [params]
    );

    const onFiltersChange = (...args) => {
        const [, category] = args;

        if (category === "price") {
            handlePriceFilter(...args);
            return;
        }

        if (specialWineFilters.includes(category)) {
            handleSpecialFilters(...args);
            return;
        }

        handleCommonTypeFilters(...args);
    };

    const handlePriceFilter = ([min, max]) => {
        setActiveFilters({
            ...activeFilters,
            price_min: min,
            price_max: max
        });
    };

    const handleSpecialFilters = (e, category) => {
        const { value } = e.target;
        setActiveFilters({ ...activeFilters, [category]: value });
    };

    const handleCommonTypeFilters = (value, category) => {
        const active = { ...activeFilters };

        if (active[category]) {
            if (active[category].includes(value)) {
                active[category] = active[category].filter(v => v !== value);
            } else {
                active[category] = [...active[category], value];
            }
        } else {
            active[category] = [value];
        }

        setActiveFilters(active);
    };

    const onFiltersSubmit = () => {
        const { page, ...active } = activeFilters;
        wineStateDispatcher({
            type: "set-cur-page",
            payload: 1
        });
        history.push(buildQuery(active));
    };

    const onFiltersReset = () => {
        console.log("reset");
        history.push(location.pathname);
        wineStateDispatcher({
            type: "set-cur-page",
            payload: 1
        });
        setActiveFilters({});
    };

    return (
        <WrappedComponent
            {...props}
            onFiltersChange={onFiltersChange}
            onFiltersSubmit={onFiltersSubmit}
            onFiltersReset={onFiltersReset}
            active={activeFilters}
        />
    );
};
