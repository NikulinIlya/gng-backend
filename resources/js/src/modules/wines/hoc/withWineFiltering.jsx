import React, { useState, useEffect } from "react";

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
        name: "Виноград",
        nameSlug: ""
    },
    locations: {
        name: "Регион",
        nameSlug: ""
    }
};

export default WrappedComponent => props => {
    const { filters } = props;
    const [labeledFilters, setLabeledFilters] = useState({});

    useEffect(
        _ => {
            if (!filters) return;
            console.log("FILTERS", filters, Object.entries(filters));
            setLabeledFilters(
                Object.entries(filters).reduce((acc, [key, value]) => (
                    acc[key] = {
                        value,
                        label: filterLabels[key].name
                    },acc
            ), {})
            );
        },
        [filters]
    );
    useEffect(
        _ => {
            console.log("labeledFilters", labeledFilters);
        },
        [labeledFilters]
    );
    return <WrappedComponent {...props} filters={labeledFilters} />;
};
