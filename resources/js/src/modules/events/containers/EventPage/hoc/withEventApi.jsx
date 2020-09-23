import React, { useState, useEffect, useReducer } from "react";

import { status as REQUEST } from "@/utils/request-status";
import { createApiService } from "@/utils/api-services";
import useRequestStatus from "@/utils/useRequestStatus";

const fetchEvents = createApiService("/api/events");

export default WrappedComponent => props => {
    const [state, dispatch] = useReducer(eventsReducer, {
        status: REQUEST.pending,
        eventInstance: {}
    });
    const setStatus = useRequestStatus(dispatch);

    useEffect(_ => {
        (async _ => {
            const { eventId } = props.match.params;
            if (!eventId) return;
            const [err, response] = await fetchEvents({
                search: `/${eventId}`
            });
            console.log("response", response);
            dispatch({ type: "set-event", payload: response.data[0] });
            setStatus(REQUEST.success);
        })();
    }, []);

    return <WrappedComponent {...props} {...state} />;
};

function eventsReducer(state, action) {
    switch (action.type) {
        case "set-event":
            return { ...state, eventInstance: action.payload };
        case "set-status":
            return { ...state, status: action.payload };
    }
}
