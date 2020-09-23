import React, { useState, useEffect, useMemo } from "react";

import { monthNames, getTime } from "../components/CalendarView/calendar-helpers";

export default WrappedComponent => props => {
    const { eventList } = props;
    const parsedEvents = useMemo(
        _ => {
            return eventList
                .map(event => ({
                    ...event,
                    date: new Date(event.event_date),
                    day: new Date(event.event_date).getDate(),
                    month: monthNames[new Date(event.event_date).getMonth()],
                    time: getTime(new Date(event.event_date))
                }))
                .sort(
                    (a, b) => new Date(a.event_date) - new Date(b.event_date)
                );
        },
        [eventList]
    );
    
    return <WrappedComponent {...props} eventList={parsedEvents} />;
};
