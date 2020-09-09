import React, { useState, useEffect, useReducer } from "react";

import redaxios, { to } from "@/utils/fetch";
import { status as REQUEST } from "@/utils/request-status";

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(wineReducer, {
        filters: [],
        page: 1,
        status: REQUEST.pending,
        activeFilters: []
    });

    useEffect(_ => {
        (async _ => {
            const response = await loadByPage();
            console.log("response", response);
            dispatch({ type: "set-products", payload: response.data });
            dispatch({ type: "set-last-page", payload: response.last_page });
        })();
    }, []);

    useEffect(
        _ => {
            (async _ => {
                if (state.page !== 1) {
                    const response = await loadByPage(state.page);
                    dispatch({
                        type: "set-products",
                        payload: [...state.products, ...response.data]
                    });
                }
            })();
        },
        [state.page]
    );

    const loadByPage = async (page = 1) => {
        dispatch({
            type: "set-status",
            payload: REQUEST.pending
        });
        const [err, response] = await to(
            redaxios(`/api/products-by-category/wine?page=${page}`)
        );
        dispatch({
            type: "set-status",
            payload: REQUEST.success
        });
        return response.data;
    };

    return (
        <WrappedComponent
            {...props}
            {...state}
            {...{ wineStateDispatcher: dispatch }}
        />
    );
};

function wineReducer(state, action) {
    switch (action.type) {
        case "set-products":
            return { ...state, products: action.payload };
        case "set-filters":
            return { ...state, filters: action.payload };
        case "set-cur-page":
            return { ...state, page: action.payload };
        case "set-last-page":
            return { ...state, lastPage: action.payload };
        case "set-status":
            return { ...state, status: action.payload };
        case "set-active-filters":
            return { ...state, activeFilters: action.payload };
        default:
            return state;
    }
}
