import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField, Checkbox } from "@/components/Input";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";

import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";
import compose from "@/utils/compose";
import { status as REQUEST } from "@/utils/request-status";

import { withApi, withLogic } from "./hoc";

import { ReactComponent as CloseIcon } from "@/assets/images/icons/close-gold-icon.svg";

import "../login.scss";

function SingIn({
    onClose,
    onInputChange,
    onFormSubmit,
    status,
    errors,
    isFormTouched,
    ...restProps
}) {
    const { isMobile } = useMeasures();
    const { t } = useTranslate();
    return (
        <div className="login">
            {!isMobile && (
                <div className="login__close">
                    <IconButton>
                        <CloseIcon onClick={onClose} />
                    </IconButton>
                </div>
            )}

            <h1 className="login__title">{t("sign-up", "Регистрация")}</h1>
            <p className="login__prediction">
                {t("already-have-an-account", "Уже есть аккаунт?")}{" "}
                <Link to="?login=sign-in">{t("sign-in", "Вход")}</Link>
            </p>
            <form className="login__form" onSubmit={onFormSubmit}>
                {status === REQUEST.pending && <Loading fixed />}
                <TextField
                    name="name"
                    onChange={onInputChange}
                    value={restProps["name"]}
                    label={t("name", "Имя")}
                />
                <TextField
                    name="second_name"
                    onChange={onInputChange}
                    value={restProps["second_name"]}
                    label={t("second-name", "Фамилия")}
                />
                <div className="field-grid">
                    <TextField
                        name="phone"
                        type="phone"
                        onChange={onInputChange}
                        value={restProps["phone"]}
                        label={t("mob-number", "Телефон")}
                    />
                    <TextField
                        name="email"
                        onChange={onInputChange}
                        value={restProps["email"]}
                        label={"Email"}
                    />
                    <TextField
                        name="password"
                        onChange={onInputChange}
                        label={t("password", "Пароль")}
                        value={restProps["password"]}
                        type="password"
                    />
                    <TextField
                        name="password_confirmation"
                        onChange={onInputChange}
                        value={restProps["password_confirmation"]}
                        label={t("confirm-the-password", "Подтвердите пароль")}
                        type="password"
                    />
                </div>
                <Checkbox
                    name="discount_agreed"
                    onChange={onInputChange}
                    label={t(
                        "receive-news-and-offers-by-e-mail",
                        "Получать новости и выгодные предложения на e-mail"
                    )}
                    variant="square"
                    defaultChecked
                />
                <Checkbox
                    name="events_agreed"
                    onChange={onInputChange}
                    label={t(
                        "receive-information-about-upcoming-events",
                        "Получать информацию о предстоящих  мероприятиях"
                    )}
                    variant="square"
                    defaultChecked
                />
                <Checkbox
                    name="terms_agreed"
                    onChange={onInputChange}
                    label={t(
                        "i-agree-with-the-site-rules-and-consent-to-the-processing-of-personal-data",
                        "Я согласен с правилами использования сайта"
                    )}
                    variant="square"
                    defaultChecked
                />
                {isFormTouched && (
                    <div className="messages">
                        {errors.map(err => (
                            <p className="messages__item" key={err}>
                                {err}
                            </p>
                        ))}
                    </div>
                )}

                <Button>{t("register", "Завершить регистрацию")}</Button>
            </form>
        </div>
    );
}

export default compose(withApi, withLogic)(SingIn);
