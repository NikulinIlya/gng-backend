import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import template from "@/assets/images/templates/event-card-template.png";

import "./past-event.scss";

export default function PastEventCard() {
  return (
    <section className="past-event">
      <div className="past-event__content">
        <img src={template} alt="" className="past-event__backdrop" />
        <div className="past-event__info">
          <h3 className="past-event__name">Fugiat irure</h3>
          <p className="past-event__place">Hyatt Petrovskiy Park</p>
          <p className="past-event__date">21 мая 2020</p>
          <Link to="/"></Link>
        </div>
      </div>
    </section>
  );
}
