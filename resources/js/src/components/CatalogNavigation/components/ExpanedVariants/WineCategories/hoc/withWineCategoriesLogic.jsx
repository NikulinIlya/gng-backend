import React, { useState, useEffect } from "react";

import useFilters from "@/utils/useFiltersApi";
import isEmpty from "@/utils/is-empty";

const BUDGET_FILTER = {
    label: "Цена",
    value: [
        { name: "до 1000 руб" },
        { name: "1000 - 1500 руб" },
        { name: "1500 - 3000 руб " },
        { name: "от 3000 руб и более" }
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
