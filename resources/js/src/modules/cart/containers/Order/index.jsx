import React, { useState, useEffect } from "react";
import { useStoreon } from "storeon/react";

import Button from "@/components/Button";
import { TextField, Checkbox } from "@/components/Input";

import useTranslate from "@/utils/useTranslate";

import Disclaimer from "../../components/Disclaimer";

import { history } from "@";

import "./order.scss";

export default function Order({
    onInputChange,
    onFormSubmit,
    status,
    errors,
    isFormTouched,
    isAuthorized,
    ...restProps
}) {
    const { t } = useTranslate();
    return (
        <div className="container">
            <div className="order">
                <h1 className="order__title">
                    {t("place-an-order", "Оформление заказа")}
                </h1>
                <form className="order__form" onSubmit={_ => history.push("/")}>
                    <TextField
                        name="name"
                        disabled={isAuthorized}
                        label={t("name", "Имя")}
                        onChange={onInputChange}
                        value={restProps["name"] || ""}
                        placeholder="Иван"
                    />
                    <TextField
                        name="second_name"
                        disabled={isAuthorized}
                        label={t("second-name", "Фамилия")}
                        onChange={onInputChange}
                        value={restProps["second_name"] || ""}
                        placeholder="Иванов"
                    />
                    <TextField
                        name="phone"
                        disabled={isAuthorized}
                        label={t("mob-number", "Телефон")}
                        onChange={onInputChange}
                        value={restProps["phone"] || ""}
                        placeholder="89990000000"
                    />
                    <TextField
                        name="email"
                        disabled={isAuthorized}
                        label={"Email"}
                        onChange={onInputChange}
                        value={restProps["email"] || ""}
                        placeholder="ivanov@mail.ru"
                    />
                    <TextField
                        name="comment"
                        disabled={isAuthorized}
                        multiline
                        onChange={onInputChange}
                        value={restProps["comment"] || ""}
                        label={t("comment", "Примечания")}
                    />
                    {/* <Checkbox
                        name="terms_agreed"
                        disabled={isAuthorized}
                        onChange={onInputChange}
                        checked={restProps["terms_agreed"] || ""}
                        variant="square"
                        label={t(
                            "i-agree-with-the-site-rules-and-consent-to-the-processing-of-personal-data",
                            "Я согласен с правилами использования сайта"
                        )}
                    /> */}
                    <Button>{t("place-an-order", "Оформление заказа")}</Button>
                </form>
                <Disclaimer />
            </div>
        </div>
    );
}
