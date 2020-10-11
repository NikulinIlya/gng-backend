import React, { useState, useEffect } from "react";

import Button from "@/components/Button";
import { TextField, Checkbox } from "@/components/Input";

import useTranslate from "@/utils/useTranslate";

import Disclaimer from "../../components/Disclaimer";

import { history } from "@";

import "./order.scss";

const fields = [
    {
        label: "Имя",
        labelSlug: "name",
        placeholder: "Иван"
    },
    {
        label: "Фамилия",
        labelSlug: "second-name",
        placeholder: "Иванов"
    },
    {
        label: "Телефон",
        labelSlug: "mob-number",
        placeholder: "+7 (000) 000-00-00"
    },
    {
        label: "Email",
        placeholder: "ivanov@mail.ru"
    },
    {
        label: "Примечания",
        placeholder: "Комментарий к заказу...",
        multiline: true
    }
];

export default function Order() {
    const { t } = useTranslate();
    return (
        <div className="container">
            <div className="order">
                <h1 className="order__title">
                    {t("place-an-order", "Оформление заказа")}
                </h1>
                <form className="order__form" onSubmit={_ => history.push("/")}>
                    {fields.map((f, i) => (
                        <TextField
                            {...f}
                            label={t(f.labelSlug, f.label)}
                            key={i}
                        />
                    ))}
                    {/* <Checkbox
                        defaultChecked
                        variant="square"
                        label={t(
                            "receive-news-and-offers-by-e-mail",
                            "Получать новости и выгодные предложения на e-mail"
                        )}
                    />
                    <Checkbox
                        defaultChecked
                        variant="square"
                        label={t(
                            "receive-information-about-upcoming-events",
                            "Получать информацию о предстоящих  мероприятиях"
                        )}
                    />
                    <Checkbox
                        defaultChecked
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
