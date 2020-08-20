import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, dispatch] = useReducer(wineReducer, {});
    useEffect(_ => {
        (async _ => {
            const [err, response] = await to(
                redaxios("/api/vines-with-products")
            );
            console.log("response", response.data.data[0]);
            dispatch({ type: "set-products", payload: response.data.data[0] });
            setIsLoaded(true);
        })();
        (async _ => {
            const [errFilters, filtersResponse] = await to(
                redaxios("/api/product-categories-filters/wine")
            );
            dispatch({ type: "set-filters", payload: filtersResponse.data });
            console.log("filtersResponse", filtersResponse.data);
        })();
    }, []);
    return <WrappedComponent {...props} {...state} {...{ isLoaded }} />;
};

function wineReducer(state, action) {
    switch (action.type) {
        case "set-products":
            return { ...state, products: action.payload };
        case "set-filters":
            return { ...state, filters: action.payload };
        default:
            return state;
    }
}
