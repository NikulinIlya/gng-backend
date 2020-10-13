import React, { useState, useEffect } from "react";

import Button from "@/components/Button";
import { TextField, Checkbox } from "@/components/Input";

import { history } from "@";
import useTranslate from "@/utils/useTranslate";
import compose from "@/utils/compose";

import Disclaimer from "../../components/Disclaimer";
import { withApi, withLogic } from "./hoc";

import "./order.scss";

function Order({
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
                <form className="order__form">
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
                        multiline
                        onChange={onInputChange}
                        value={restProps["comment"] || ""}
                        label={t("comment", "Примечания")}
                    />
                    <Checkbox
                        name="terms_agreed"
                        onChange={onInputChange}
                        checked={restProps["terms_agreed"] || ""}
                        variant="square"
                        label={t(
                            "i-agree-with-the-site-rules-and-consent-to-the-processing-of-personal-data",
                            "Я согласен с правилами использования сайта"
                        )}
                    />
                    <Button>{t("place-an-order", "Оформление заказа")}</Button>
                </form>
                <Disclaimer />
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(Order);
