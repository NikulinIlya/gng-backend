import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
    useCallback
} from "react";
import { useLocation } from "react-router-dom";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";
import useRequestStatus from "@/utils/useRequestStatus";
import useQueryParams from "@/utils/useQueryParams";
// import useFilters from "@/utils/useFiltersApi";

const fetchWines = createApiService("/api/products-by-category/wine");
const initialState = {
    filters: {},
    page: 1,
    status: REQUEST.pending,
    query: ""
};

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(wineReducer, initialState);
    const location = useLocation();
    const { search, params, applyParam } = useQueryParams();
    const setStatus = useRequestStatus(dispatch);
    const isFirstPage = useMemo(_ => state.page === 1, [state.page]);
    const urlParams = useMemo(_ => new URLSearchParams(location.search), [
        location.search
    ]);

    useEffect(
        _ => {
            (async _ => {
                if (!isFirstPage) {
                    const response = await loadProducts(
                        applyParam(state.query, "page", state.page)
                    );
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
        const [err, response] = await fetchWines({ search });
        if (err) return setStatus(REQUEST.error);
        setStatus(REQUEST.success);
        return response.data;
    };

    return (
        <WrappedComponent
            {...props}
            {...state}
            {...{
                wineStateDispatcher: dispatch,
                location,
                urlParams
            }}
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
