import React, { useState, useEffect } from "react";

import EventCard from "@/components/EventCard";

export default function ListView({ list = [] }) {
  return list.map((e, i) => (
    <div className="events__item" key={i}>
      <EventCard to="/events/1" />
    </div>
  ));
}
