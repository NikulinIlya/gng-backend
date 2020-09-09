import React, { useState, useEffect } from "react";

export default WrappedComponent => props => {
    const { wineStateDispatcher, activeFilters } = props;

    useEffect(
        _ => {
            // console.log("activeFilters", activeFilters);
        },
        [activeFilters]
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
