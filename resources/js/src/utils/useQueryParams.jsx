import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";

const commonProductFilters = ["price_max", "price_max"];

export default function useQueryParams() {
    const [state, dispatch] = useReducer(queryReducer, { params: null });
    const { search } = useLocation();

    useEffect(
        _ => {
            dispatch({
                type: "set-params",
                payload: search ? parseSearch(new URLSearchParams(search)) : {}
            });
            dispatch({
                type: "set-search-string",
                payload: search || ""
            });
        },
        [search]
    );

    return { ...state, applyParam, buildQuery, normalizeQueryParams };
}

function queryReducer(state, action) {
    switch (action.type) {
        case "set-params":
            return { ...state, params: action.payload };
        case "set-search-string":
            return { ...state, search: action.payload };
    }
}

function normalizeQueryParams(params = {}, allowedParamNames = []) {
    const normalized = Object.keys(params)
        .filter(key =>
            [...commonProductFilters, ...allowedParamNames].includes(key)
        )
        .reduce((acc, cur) => {
            acc[cur] = params[cur];
            return acc;
        }, {});
    return normalized;
}

function applyParam(search = "", key = "", value = "") {
    if ([key, value].some(v => !v)) return "";

    const searchParams = new URLSearchParams(search);

    if (!key.includes("[]")) searchParams.set(key, value);
    else searchParams.append(key, value);

    console.log("s", `?${searchParams.toString()}`);

    return `?${searchParams.toString()}`;
}

function parseSearch(paramsInstance) {
    if (!paramsInstance) return {};
    let newParams = {};
    for (let [key, value] of paramsInstance.entries()) {
        const isArrParam = key.includes("[]");
        const normalizedKey = isArrParam ? key.replace("[]", "") : key;
        if (!isArrParam) {
            newParams[key] = value;
        } else {
            newParams[normalizedKey] = newParams[normalizedKey]
                ? [...newParams[normalizedKey], value]
                : [value];
        }
    }
    return newParams;
}

function buildQuery(params) {
    function expandParam(key, value) {
        const isArrParam = Array.isArray(value);
        if (!isArrParam) return `${key}=${value}`;
        return value.reduce(
            (acc, cur, i, arr) =>
                acc + `${key}[]=${cur}${i !== arr.length - 1 ? "&" : ""}`,
            ""
        );
    }
    const res = Object.entries(params).reduce((acc, [key, value], i, arr) => {
        return (
            acc + expandParam(key, value) + `${i !== arr.length - 1 ? "&" : ""}`
        );
    }, "?");

    return res;
}
