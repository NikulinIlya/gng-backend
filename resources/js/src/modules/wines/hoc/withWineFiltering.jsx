import React, { useEffect, useState } from "react";

import useQueryParams from "@/utils/useQueryParams";

const specialWineFilters = ["sweetness", "body", "acidity"];
const commonProductFilters = ["price_max", "price_max"];

export default WrappedComponent => props => {
    const { wineStateDispatcher, filters, history } = props;
    const [activeFilters, setActiveFilters] = useState({});
    const { params, buildQuery, normalizeQueryParams } = useQueryParams();

    useEffect(
        _ => {
            if (params) {
                const allowedFilters = [
                    ...Object.keys(filters),
                    ...commonProductFilters,
                    ...specialWineFilters
                ];
                const filteredParams = normalizeQueryParams(
                    params,
                    allowedFilters
                );
                const normalizedQuery = buildQuery(filteredParams);

                wineStateDispatcher({
                    type: "set-query",
                    payload: normalizedQuery
                });

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

    const handleCommonTypeFilters = (e, category) => {
        const active = { ...activeFilters };
        const { value } = e.target;

        if (e.target.checked) {
            active[category] = active[category]
                ? [...active[category], value]
                : [value];
        } else {
            if (active[category].includes(value)) {
                active[category] = active[category].filter(v => v !== value);
            }
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
