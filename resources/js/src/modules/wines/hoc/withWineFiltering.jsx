import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useLocation } from "react-router-dom";

export default WrappedComponent => props => {
    const {
        wineStateDispatcher,
        filters,
        urlParams,
        hasCategoryParams
    } = props;
    const [state, filtersDispatcher] = useReducer(filtersDispatcher, {
        activeFilters: {}
    });

    useEffect(
        _ => {
            const search = hasCategoryParams
                ? [...Object.keys(filters)]
                      .filter(f => urlParams.has(`${f}[]`))
                      .reduce((acc, cur) => {
                          return (acc += `${cur}[]=${urlParams.get(
                              `${cur}[]`
                          )}`);
                      }, "?")
                : "";

            urlParams.has("page") &&
                wineStateDispatcher({
                    type: "set-cur-page",
                    payload: +urlParams.get("page")
                });

            wineStateDispatcher({
                type: "set-query",
                payload: search
            });
        },
        [urlParams, filters]
    );

    const onFiltersChange = (e, category) => {
        // if (e.target.checked) {
        //     const instance = { category, value: e.target.value }
        //     const payload = [...activeFilters, instance]
        // } else {
        // }
        // wineStateDispatcher({
        //     type: "set-active-filters",
        //     payload
        // });
        // console.log("change", e.target.value, "key", category);
    };

    return <WrappedComponent {...props} onFiltersChange={onFiltersChange} />;
};

function filtersReducer(state, action) {
    switch (action.type) {
        case "set-active-filters":
            return { ...state, activeFilters: action.payload };
    }
}
