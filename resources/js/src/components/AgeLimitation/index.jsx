import React, { useState, useEffect } from "react";

import Button from "@/components/Button";

import "./age-limitation.scss";

export default function AgeLimitation({ onPositive, onNegative }) {
  return (
    <div className="age-limitation">
      <section className="age-limitation__body">
        <h1 className="age-limitation__title">18+</h1>
        <p className="age-limitation__text">
          Добро пожаловать на сайт винного магазина Grapes & Grains.{" "}
        </p>
        <p className="age-limitation__description">
          Сайт содержит информацию для лиц совершеннолетнего возраста. Сведения,
          размещенные на сайте, не являются рекламой, носят исключительно
          информационный характер, и предназначены только для личного
          использования.
        </p>
      </section>
      <section className="age-limitation__footer actions">
        <h2 className="actions__title">Вам уже исполнилось 18 лет?</h2>
        <div className="actions__set">
          <Button onClick={onPositive}>Мне исполнилось 18 лет</Button>
        </div>
      </section>
    </div>
  );
}
