import React, { useState, useEffect, useReducer } from "react";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";
import useRequestStatus from "@/utils/useRequestStatus";

const fetchEvents = createApiService("/api/events");

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(eventsReducer, {
        status: REQUEST.pending,
        eventList: []
    });
    const setStatus = useRequestStatus(dispatch);

    useEffect(_ => {
        (async _ => {
            const [err, response] = await fetchEvents({ search: "" });
            console.log("response", response);
            dispatch({ type: "set-events", payload: response.data });
            setStatus(REQUEST.success);
        })();
    }, []);

    return <WrappedComponent {...props} {...state} />;
};

function eventsReducer(state, action) {
    switch (action.type) {
        case "set-events":
            return { ...state, eventList: action.payload };
        case "set-status":
            return { ...state, status: action.payload };
    }
}
