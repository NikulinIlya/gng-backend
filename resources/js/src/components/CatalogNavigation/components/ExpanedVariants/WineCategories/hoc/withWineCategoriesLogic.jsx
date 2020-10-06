import React, { useState, useEffect } from "react";

import useFilters from "@/utils/useFiltersApi";
import isEmpty from "@/utils/is-empty";

const BUDGET_FILTER = {
    label: "Цена",
    labelSlug: "price",
    value: [
        { name: "до 1000 руб", query: "?price_max=1000" },
        { name: "1000 - 1500 руб", query: "?price_min=1000&price_max=1500" },
        { name: "1500 - 3000 руб", query: "?price_min=1500&price_max=3000" },
        { name: "от 3000 руб и более", query: "?price_min=3000" }
    ]
};

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [extendedFilters, setExtendedFilters] = useState({});
    const filters = useFilters("wine");
    useEffect(
        _ => {
            if (!isEmpty(filters)) {
                setExtendedFilters({
                    ...filters,
                    budget: BUDGET_FILTER
                });
                setIsLoaded(true);
            }
        },
        [filters]
    );
    return (
        <WrappedComponent
            {...props}
            filters={extendedFilters}
            isLoaded={isLoaded}
        />
    );
};
