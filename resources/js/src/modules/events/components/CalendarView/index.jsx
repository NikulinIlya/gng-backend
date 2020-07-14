import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import IconButton from "@/components/IconButton";

import prevIcon from "@/assets/images/icons/arrow-prev.svg";
import nextIcon from "@/assets/images/icons/arrow-next.svg";

import {
  getCalendarData,
  areEqual,
  daysOfWeek,
  monthNames,
  isOffsetDay,
} from "./calendar-helpers";

import "./calendar-view.scss";

export default function CalendarView() {
  const today = new Date();
  const [events, setEvents] = useState([
    new Date(today.getFullYear(), today.getMonth(), 25),
    new Date(today.getFullYear(), today.getMonth() + 1, 19),
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 5),
  ]);
  const [observedDate, setObservedDate] = useState(today);
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    setMonthData(getCalendarData(observedDate));
  }, [observedDate]);

  const setPrevMonth = (_) =>
    setObservedDate(
      new Date(observedDate.getFullYear(), observedDate.getMonth() - 1)
    );
  const setNextMonth = (_) =>
    setObservedDate(
      new Date(observedDate.getFullYear(), observedDate.getMonth() + 1)
    );

  return (
    <>
      <section className="calendar-nav">
        <IconButton className="calendar-nav__action" onClick={setPrevMonth}>
          <img src={prevIcon} alt="" />
        </IconButton>
        <h3 className="calendar-nav__current-month">
          {`${
            monthNames[observedDate.getMonth()]
          } ${observedDate.getFullYear()}`}
        </h3>
        <IconButton className="calendar-nav__action" onClick={setNextMonth}>
          <img src={nextIcon} alt="" />
        </IconButton>
      </section>
      <div className="calendar">
        <div className="calendar__head">
          {daysOfWeek.map((d) => (
            <div className="calendar__col-name" key={d}>
              {d}
            </div>
          ))}
        </div>
        <div className="calendar__body">
          {monthData.map((week, weekIndex) => (
            <div className="calendar__row" key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn("calendar__col", {
                    today: areEqual(day, new Date()),
                    offset: isOffsetDay(day, observedDate),
                    day: !events.find((e) => areEqual(e, day)),
                  })}
                >
                  {events.find((e) => areEqual(e, day)) ? (
                    <div className="event">
                      <div className="event__day">
                        <span>{day.getDate()}</span>
                        <Link className="event__details" to="/events/1" hidden>
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  ) : (
                    day.getDate()
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
