import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";

export default function useApiState(slug) {
    const [filters, setFilters] = useState([]);
    useEffect(_ => {
        if (!slug) throw new Error("Category slug is undefined");
        (async _ => {
            const url =
                slug === "strong"
                    ? `/api/strong-drinks/filters`
                    : `/api/product-categories-filters/${slug}`;
                    
            const [err, response] = await to(redaxios(url));
            console.log("FILTERS RESPONSE", response.data);
            setFilters(response.data);
        })();
    }, []);
    return filters;
}
