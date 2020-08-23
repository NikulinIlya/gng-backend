import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";

export default WrappedComponent => props => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, dispatch] = useReducer(wineReducer, { filters: [] });

    useEffect(_ => {
        (async _ => {
            const [err, response] = await to(
                redaxios("/api/products-by-category/wine")
            );
            console.log("response", response.data.data[0]);
            dispatch({ type: "set-products", payload: response.data.data[0] });
            setIsLoaded(true);
        })();
    }, []);

    return (
        <WrappedComponent
            {...props}
            {...state}
            {...{ isLoaded, wineStateDispatcher: dispatch }}
        />
    );
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
