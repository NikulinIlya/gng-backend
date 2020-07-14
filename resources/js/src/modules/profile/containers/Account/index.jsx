import React, { useState, useEffect } from "react";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { TextField, Checkbox, Select } from "@/components/Input";

import "./account.scss";

export default function Account() {
  return (
    <div className="account">
      <ProfileSection
        title={(_) => (
          <Heading className="account-section-heading">
            Персональные данные
          </Heading>
        )}
      >
        <form className="personal-info">
          <TextField label="Имя" />
          <TextField label="Фамилия" />
          <TextField label="Отчество" />
          <div className="fields-grid">
            <TextField label="Телефон" />
            <TextField label="Email" />
            <DateInput label="Дата Рождения" />
            <div className="fields-flex">
              <h3 className="fields-flex__title">Пол</h3>
              <div className="fields-flex__body">
                <Checkbox variant="square" label="Мужской" defaultChecked />
                <Checkbox variant="square" label="Женский" />
              </div>
            </div>
          </div>
          <Button>Сохранить</Button>
        </form>
      </ProfileSection>

      <ProfileSection
        title={(_) => (
          <Heading className="account-section-heading">Изменить пароль</Heading>
        )}
      >
        <form className="password">
          <TextField label="Старый пароль" type="password" />
          <div className="fields-grid">
            <TextField label="Новый пароль" type="password" />
            <TextField label="Подтверждение нового пароля" type="password" />
          </div>
          <Button>Сохранить</Button>
        </form>
      </ProfileSection>

      <ProfileSection
        title={(_) => (
          <Heading className="account-section-heading">Оповещения</Heading>
        )}
      >
        <form className="notifications">
          <Checkbox
            variant="square"
            label="Получать новости и выгодные предложения на e-mail"
            defaultChecked
          />
          <Checkbox
            variant="square"
            label="Получать информацию о предстоящих  мероприятиях"
            defaultChecked
          />
          <Button>Сохранить</Button>
        </form>
      </ProfileSection>
    </div>
  );
}

function ProfileSection({ title, children }) {
  return (
    <section className="account-section">
      {title && title()}
      <div className="account-section__content">{children}</div>
    </section>
  );
}

function DateInput({ label = "Дата" }) {
  const days = Array.from({ length: 31 }).map((_, i) => ({
    text: ++i,
    value: ++i,
  }));
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const minYear = new Date().getFullYear() - 100;
  const maxYear = new Date().getFullYear() - 18;
  return (
    <div className="date">
      {label && <h3 className="date__title">{label}</h3>}
      <div className="date__body">
        <Select options={days} />
        <Select options={months.map((m, i) => ({ text: m, value: i }))} />
        <Select
          options={Array.from({ length: maxYear - minYear }).map((_, i) => ({
            text: maxYear - i,
            value: maxYear - i,
          }))}
        />
      </div>
    </div>
  );
}
