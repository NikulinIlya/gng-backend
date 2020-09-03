import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './details-card.scss'

export default function DetailsPageCard({ image, title, description, link = '' }) {
  return (
    <section className="details-card">
      <div className="details-card__image">
        <img src={image} alt="" />
      </div>
      <h3 className="details-card__title" title={title}>{title}</h3>
      <p className="details-card__descr">{description}</p>
      <Link className="details-card__link" to={link}>
        подробнее
      </Link>
    </section>
  );
}
