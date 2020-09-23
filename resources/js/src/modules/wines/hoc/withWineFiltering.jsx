import React, { useState, useEffect, useReducer, useMemo } from "react";

import useQueryParams from "@/utils/useQueryParams";

const specialWineFilters = ["sweetness", "body", "acidity"];

export default WrappedComponent => props => {
    const { wineStateDispatcher, filters, history } = props;
    const [state, filtersDispatcher] = useReducer(filtersReducer, {
        activeFilters: {}
    });
    const { params, buildQuery } = useQueryParams();

    useEffect(
        _ => {
            if (params) {
                const extendedFilters = {
                    ...filters,
                    sweetness: "1",
                    body: "1",
                    acidity: "1",
                    price_min: "value",
                    price_max: "value"
                };
                const filteredParams = Object.keys(params)
                    .filter(key => extendedFilters[key])
                    .reduce((acc, cur) => {
                        acc[cur] = params[cur];
                        return acc;
                    }, {});

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
            if (params) {
                filtersDispatcher({
                    type: "set-active-filters",
                    payload: params
                });
            }
        },
        [params]
    );

    useEffect(
        _ => {
            console.log("state.activeFilters", state.activeFilters);
            // console.log(buildQuery(state.activeFilters));
        },
        [state.activeFilters]
    );

    useEffect(_ => console.log("params", params), [params]);

    const onFiltersChange = (e, category) => {
        // console.log("e", e, "category", category);
        if (category === "price") {
            handlePriceFilter(e);
            return;
        }
        if (specialWineFilters.includes(category)) {
            // console.log(e.target.value, category);
            handleSpecialFilters(e.target.value, category);
            return;
        }

        const active = { ...state.activeFilters };
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

        filtersDispatcher({
            type: "set-active-filters",
            payload: active
        });
        // console.log("change", e.target.value, "key", category);
    };

    const handlePriceFilter = value => {
        filtersDispatcher({
            type: "set-active-filters",
            payload: {
                ...state.activeFilters,
                price_min: value[0],
                price_max: value[1]
            }
        });
    };

    const handleSpecialFilters = (value, category) => {
        filtersDispatcher({
            type: "set-active-filters",
            payload: { ...state.activeFilters, [category]: value }
        });
    };

    const onFiltersSubmit = () => {
        console.log("submit");
        history.push(buildQuery(state.activeFilters));
    };
    const onFiltersReset = () => {
        console.log("reset");
        history.push(location.pathname);
        filtersDispatcher({
            type: "set-active-filters",
            payload: {}
        });
    };

    return (
        <WrappedComponent
            {...props}
            onFiltersChange={onFiltersChange}
            onFiltersSubmit={onFiltersSubmit}
            onFiltersReset={onFiltersReset}
            active={state.activeFilters}
        />
    );
};

function filtersReducer(state, action) {
    switch (action.type) {
        case "set-active-filters":
            return { ...state, activeFilters: action.payload };
    }
}
