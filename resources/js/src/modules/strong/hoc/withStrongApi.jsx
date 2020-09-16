import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";
import useRequestStatus from "@/utils/useRequestStatus";

const fetchStrong = createApiService("/api/strong-drinks");

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(strongReducer, {
        products: [],
        status: REQUEST.pending,
        page: 1
    });
    const location = useLocation();
    const setStatus = useRequestStatus(dispatch);
    const isFirstPage = useMemo(_ => state.page === 1, [state.page]);
    const urlParams = useMemo(_ => new URLSearchParams(location.search), [
        location.search
    ]);
    useEffect(
        _ => {
            (async _ => {
                if (!isFirstPage) {
                    const search = state.query
                        ? `${state.query}&page=${state.page}`
                        : `?page=${state.page}`;
                    const response = await loadProducts(search);
                    dispatch({
                        type: "set-products",
                        payload: [...state.products, ...response.data]
                    });
                }
            })();
        },
        [state.page]
    );

    useEffect(
        _ => {
            (async _ => {
                const response = await loadProducts(state.query);
                dispatch({ type: "set-pagination", payload: response });
            })();
        },
        [state.query]
    );

    const loadProducts = async (search = "") => {
        setStatus(REQUEST.pending);
        const [err, response] = await fetchStrong({ search });
        if (err) {
            setStatus(REQUEST.error);
            return err;
        }
        setStatus(REQUEST.success);
        return response.data;
    };
    return <WrappedComponent {...props} {...state} strongDispatcher={dispatch} />;
};

function strongReducer(state, action) {
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
        case "set-pagination":
            return {
                ...state,
                products: action.payload.data,
                lastPage: action.payload.last_page
            };
        case "set-query":
            return { ...state, query: action.payload };
        default:
            return state;
    }
}
