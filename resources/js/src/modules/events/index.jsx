import React, { useState, useEffect, createElement } from "react";

// import PastEventCard from "@/components/PastEventCard";
// import Button from "@/components/Button";
import Loading from "@/components/Loading";

import compose from "@/utils/compose";
import { status as REQUEST } from "@/utils/request-status";

import Navigation from "./components/ViewTypeNavigation";
import ListView from "./components/ListView";
import CalendarView from "./components/CalendarView";

import { withApi, withLogic } from "./hoc";

import "./events.scss";

function Events({ eventList, status }) {
    const viewBy = {
        list: ListView,
        calendar: CalendarView
    };
    const [type, setType] = useState("list");

    return (
        <div className="container">
            {status === REQUEST.pending && <Loading />}
            {status === REQUEST.success && (
                <section className="events">
                    <h1 className="events__title">Предстоящие мероприятия</h1>
                    <Navigation defaultType={type} onChange={setType} />
                    <div className="events__view">
                        {createElement(viewBy[type], {
                            list: eventList,
                            events: eventList.map(e => e.date)
                        })}
                    </div>
                </section>
            )}

            {/* <section className="events past-events">
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
      </section> */}
        </div>
    );
}

export default compose(withApi, withLogic)(Events);
