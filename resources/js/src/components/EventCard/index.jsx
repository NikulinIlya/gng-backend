import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./event-card.scss";

export default function EventCard({
    to = "",
    name = "",
    address = "",
    description = "",
    day = "",
    month = "",
    time = "",
    main_image = "",
    price = 0
}) {
    return (
        <article className="event-card">
            <div className="event-card__date date">
                <div className="date__day">{day}</div>
                <div className="date__month">{month}</div>
            </div>
            <div className="event-card__thumb">
                <div className="event-card__thumb-image">
                    <img src={main_image} alt="" />
                </div>
            </div>
            <section className="event-card__info">
                <h2 className="event-card__name">{name}</h2>
                <p className="event-card__common">
                    <span>{address}</span>
                    <span>{" / "}</span>
                    <span>{time}</span>
                </p>
                <p className="event-card__description">{description}</p>
                <div className="event-card__price price">
                    <span className="price__val">{price}</span>{" "}
                    <span className="price__cur">руб.</span>
                </div>
                <Link className="event-card__details" to={to}>
                    Подробности мероприятия
                </Link>
            </section>
        </article>
    );
}
