import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import template from "@/assets/images/templates/event-card-template.png";

import "./past-event.scss";

export default function PastEventCard({
    to = "",
    name = "",
    address = "",
    day = "",
    month = "",
    date = "",
    main_image = ""
}) {
    return (
        <section className="past-event">
            <div className="past-event__content">
                <img src={main_image} alt="" className="past-event__backdrop" />
                <div className="past-event__info">
                    <h3 className="past-event__name">{name}</h3>
                    <p className="past-event__place">{address}</p>
                    <p className="past-event__date">{`${day} ${month} ${date &&
                        date.getFullYear()}`}</p>
                    <Link to={to}></Link>
                </div>
            </div>
        </section>
    );
}
