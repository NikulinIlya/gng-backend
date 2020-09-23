import React, { useState, useEffect } from "react";

import EventCard from "@/components/EventCard";

export default function ListView({ list = [] }) {
    return list.map((event, i) => (
        <div className="events__item" key={i}>
            <EventCard
                {...event}
                to={`/events/${event.id}`}
            />
        </div>
    ));
}
