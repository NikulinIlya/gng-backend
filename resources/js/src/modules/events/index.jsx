import React, { useState, useEffect, createElement } from "react";

import PastEventCard from "@/components/PastEventCard";
import Button from "@/components/Button";

import Navigation from "./components/ViewTypeNavigation";
import ListView from "./components/ListView";
import CalendarView from "./components/CalendarView";

import "./events.scss";

function Events() {
  const viewBy = {
    list: ListView,
    calendar: CalendarView,
  };
  const [type, setType] = useState("list");

  return (
    <div className="container">
      <section className="events">
        <h1 className="events__title">Предстоящие мероприятия</h1>
        <Navigation defaultType={type} onChange={setType} />
        <div className="events__view">
          {createElement(viewBy[type], { list: Array.from({ length: 3 }) })}
        </div>
      </section>
      <section className="events past-events">
        <h2 className="events__title">Прошедшие мероприятия</h2>
        <div className="events__view">
          {Array.from({ length: 3 }).map((e, i) => (
            <div className="past-events__item" key={i}>
              <PastEventCard />
            </div>
          ))}
        </div>
        <div className="past-events__all">
          <Button>Посмотреть все</Button>
        </div>
      </section>
    </div>
  );
}

export default Events;
