import React, { useEffect, useReducer, useMemo, useCallback } from "react";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";
import useRequestStatus from "@/utils/useRequestStatus";
import useQueryParams from "@/utils/useQueryParams";

const fetchWines = createApiService("/api/products-by-category/wine");

const initialState = {
    filters: {},
    page: 1,
    status: REQUEST.pending,
    query: "",
    products: []
};

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(wineReducer, initialState);
    const { page, query, products } = state;
    const { applyParam } = useQueryParams();
    const setStatus = useRequestStatus(dispatch);

    useEffect(
        _ => {
            (async _ => {
                if (page !== 1) {
                    const search = applyParam(query, "page", page);
                    const { data } = await loadProducts(search);
                    dispatch({
                        type: "set-products",
                        payload: [...products, ...data]
                    });
                }
            })();
        },
        [page]
    );

    useEffect(
        _ => {
            (async _ => {
                const response = await loadProducts(query);
                dispatch({ type: "set-pagination", payload: response });
            })();
        },
        [query]
    );

    const loadProducts = async (search = "") => {
        setStatus(REQUEST.pending);
        const [err, response] = await fetchWines({ search });
        if (err) return setStatus(REQUEST.error);
        setStatus(REQUEST.success);
        return response.data;
    };

    return (
        <WrappedComponent
            {...props}
            {...state}
            wineStateDispatcher={dispatch}
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
