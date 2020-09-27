import React, { useState, useEffect, createElement } from "react";

import PastEventCard from "@/components/PastEventCard";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Heading from "@/components/Heading";

import compose from "@/utils/compose";
import { status as REQUEST } from "@/utils/request-status";

import Navigation from "./components/ViewTypeNavigation";
import ListView from "./components/ListView";
import CalendarView from "./components/CalendarView";

import { withApi, withLogic } from "./hoc";

import "./events.scss";

function Events({ eventList, futureEvents, pastEvents, status }) {
    const viewBy = {
        list: ListView,
        calendar: CalendarView
    };
    const [type, setType] = useState("list");

    return (
        <div className="events-container container">
            {status === REQUEST.pending && <Loading fixed />}
            {status === REQUEST.success && (
                <section className="events">
                    <Heading className="events__title">
                        Предстоящие мероприятия
                    </Heading>
                    <Navigation defaultType={type} onChange={setType} />
                    <div className="events__view">
                        {createElement(viewBy[type], {
                            list: eventList,
                            futureEvents,
                            events: eventList.map(e => e.date)
                        })}
                    </div>
                </section>
            )}

            <section className="events past-events">
                <Heading className="events__title">
                    Прошедшие мероприятия
                </Heading>
                <div className="events__view">
                    {pastEvents.map((e, i) => (
                        <div className="past-events__item" key={i}>
                            <PastEventCard {...e} to={`/events/${e.id}`} />
                        </div>
                    ))}
                </div>
                {/* <div className="past-events__all">
                    <Button>Посмотреть все</Button>
                </div> */}
            </section>
        </div>
    );
}

export default compose(withApi, withLogic)(Events);
