import React, { useState, useEffect, useMemo } from "react";

import { contextMonthNames, getTime } from '../../../components/CalendarView/calendar-helpers'

export default WrappedComponent => props => {
    const { eventInstance } = props;
    const parsedEvent = useMemo(
        _ => {
            return {
                ...eventInstance,
                date: new Date(eventInstance.event_date),
                day: new Date(eventInstance.event_date).getDate(),
                month: contextMonthNames[new Date(eventInstance.event_date).getMonth()],
                year: new Date(eventInstance.event_date).getFullYear(),
                time: getTime(new Date(eventInstance.event_date))
            };
        },
        [eventInstance]
    );

    
    return <WrappedComponent {...props} eventInstance={parsedEvent} />;
};
