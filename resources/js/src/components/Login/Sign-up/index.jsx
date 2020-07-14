import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField, Checkbox } from "@/components/Input";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";

import useMeasures from "@/utils/useMeasures";

import { ReactComponent as CloseIcon } from "@/assets/images/icons/close-gold-icon.svg";

import "../login.scss";

export default function SingIn({ onClose }) {
  const { isMobile } = useMeasures();
  return (
    <div className="login">
      {!isMobile && (
        <div className="login__close">
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </div>
      )}

      <h1 className="login__title">Регистрация</h1>
      <p className="login__prediction">
        Уже есть аккаунт? <Link to="?login=sign-in">Вход</Link>
      </p>
      <form className="login__form">
        <TextField label={"Имя"} />
        <TextField label={"Фамилия"} />
        <div className="field-grid">
          <TextField label={"Телефон"} />
          <TextField label={"Email"} />
          <TextField label={"Пароль"} type="password" />
          <TextField label={"Подтвердите пароль"} type="password" />
        </div>
        <Checkbox
          label={"Получать новости и выгодные предложения на e-mail"}
          variant="square"
          defaultChecked
        />
        <Checkbox
          label={"Получать информацию о предстоящих  мероприятиях"}
          variant="square"
          defaultChecked
        />
        <Checkbox
          label={"Я согласен с правилами использования сайта"}
          variant="square"
          defaultChecked
        />
        <Button>Завершить регистрацию</Button>
      </form>
    </div>
  );
}
