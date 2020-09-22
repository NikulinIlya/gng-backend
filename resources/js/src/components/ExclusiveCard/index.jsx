import React, { useState, useEffect } from "react";
import Button from "@/components/Button";

import "./exclusive-card.scss";

export default function ExclusiveCard({ name, description, backdrop, to = '' }) {
  return (
    <article className="exclusive-card">
      <section className="exclusive-card__content">
        <img src={backdrop} alt="" className="exclusive-card__backdrop" />
        <h1 className="exclusive-card__name">{name}</h1>
        <p className="exclusive-card__description">{description}</p>
        <Button to={to}>Подробнее</Button>
      </section>
    </article>
  );
}
