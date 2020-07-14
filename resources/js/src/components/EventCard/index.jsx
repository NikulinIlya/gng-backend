import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import template from "@/assets/images/templates/event-card-template.png";

import "./event-card.scss";

export default function EventCard({ to = '' }) {
  return (
    <article className="event-card">
      <div className="event-card__date date">
        <div className="date__day">14</div>
        <div className="date__month">июня</div>
      </div>
      <div className="event-card__thumb">
        <div className="event-card__thumb-image">
          <img src={template} alt="" />
        </div>
      </div>
      <section className="event-card__info">
        <h2 className="event-card__name">Spice Night</h2>
        <p className="event-card__common">
          <span>Hyatt Petrovskiy Park</span>
          <span>{" / "}</span>
          <span>19:00</span>
        </p>
        <p className="event-card__description">
          The series begins by looking at the factors that influence the balance
          of wine, learning about alcohol, tannins, acidity, aroma and flavour,
          and how to describe wine, as well as spotting levels
        </p>
        <div className="event-card__price price">
          <span className="price__val">5 500</span>{" "}
          <span className="price__cur">руб.</span>
        </div>
        <Link className="event-card__details" to={to}>
          Подробности мероприятия
        </Link>
      </section>
    </article>
  );
}
