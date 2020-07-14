import React, { useState, useEffect } from "react";

import Button from "@/components/Button";
import { TextField, Checkbox } from "@/components/Input";

import Disclaimer from "../../components/Disclaimer";

import { history } from "@";

import "./order.scss";

const fields = [
  {
    label: "Имя",
    placeholder: "Иван",
  },
  {
    label: "Фамилия",
    placeholder: "Иванов",
  },
  {
    label: "Телефон",
    placeholder: "+7 (000) 000-00-00",
  },
  {
    label: "Email",
    placeholder: "ivanov@mail.ru",
  },
  {
    label: "Примечания",
    placeholder: "Комментарий к заказу...",
    multiline: true,
  },
];

export default function Order() {
  return (
    <div className="container">
      <div className="order">
        <h1 className="order__title">Оформление заказа</h1>
        <form className="order__form" onSubmit={(_) => history.push("/")}>
          {fields.map((f, i) => (
            <TextField {...f} key={i} />
          ))}
          <Checkbox
            defaultChecked
            variant="square"
            label={"Получать новости и выгодные предложения на e-mail"}
          />
          <Checkbox
            defaultChecked
            variant="square"
            label={"Получать информацию о предстоящих  мероприятиях"}
          />
          <Checkbox
            defaultChecked
            variant="square"
            label={"Я согласен с правилами использования сайта"}
          />
          <Button>Оформить заказ</Button>
        </form>
        <Disclaimer />
      </div>
    </div>
  );
}
