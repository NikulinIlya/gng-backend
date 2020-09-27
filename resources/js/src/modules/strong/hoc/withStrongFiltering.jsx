import React, { useEffect, useState } from "react";

import useQueryParams from "@/utils/useQueryParams";

export default WrappedComponent => props => {
    const { strongDispatcher, filters, history } = props;
    const [activeFilters, setActiveFilters] = useState({});
    const { params, buildQuery, normalizeQueryParams } = useQueryParams();

    useEffect(
        _ => {
            if (params) {
                // merge all allowed param keys for current category
                const allowedFilters = [...Object.keys(filters)];

                // filter urlParams for only allowed list
                const filteredParams = normalizeQueryParams(
                    params,
                    allowedFilters
                );

                // build query string from filtered params
                const normalizedQuery = buildQuery(filteredParams);

                // dispatch normalized query string
                strongDispatcher({
                    type: "set-query",
                    payload: normalizedQuery
                });

                // dispatch new page if existing
                if (params["page"] && !isNaN(params["page"]))
                    strongDispatcher({
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

    useEffect(
        _ => {
            console.log("state.activeFilters", activeFilters);
            // console.log(buildQuery(state.activeFilters));
        },
        [activeFilters]
    );

    useEffect(_ => console.log("params", params), [params]);

    const onFiltersChange = (...args) => {
        const [, category] = args;

        if (category === "price") {
            handlePriceFilter(...args);
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
        console.log("submit");
        history.push(buildQuery(activeFilters));
    };

    const onFiltersReset = () => {
        console.log("reset");
        history.push(location.pathname);
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
