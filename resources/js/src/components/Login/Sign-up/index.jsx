import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField, Checkbox } from "@/components/Input";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";

import useMeasures from "@/utils/useMeasures";
import useTranslate from "@/utils/useTranslate";

import { ReactComponent as CloseIcon } from "@/assets/images/icons/close-gold-icon.svg";

import "../login.scss";

export default function SingIn({ onClose }) {
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
            <form className="login__form">
                <TextField label={t("name", "Имя")} />
                <TextField label={t("second-name", "Фамилия")} />
                <div className="field-grid">
                    <TextField label={t("mob-number", "Телефон")} />
                    <TextField label={"Email"} />
                    <TextField
                        label={t("password", "Пароль")}
                        type="password"
                    />
                    <TextField
                        label={t("confirm-the-password", "Подтвердите пароль")}
                        type="password"
                    />
                </div>
                <Checkbox
                    label={t(
                        "receive-news-and-offers-by-e-mail",
                        "Получать новости и выгодные предложения на e-mail"
                    )}
                    variant="square"
                    defaultChecked
                />
                <Checkbox
                    label={t(
                        "receive-information-about-upcoming-events",
                        "Получать информацию о предстоящих  мероприятиях"
                    )}
                    variant="square"
                    defaultChecked
                />
                <Checkbox
                    label={t(
                        "i-agree-with-the-site-rules-and-consent-to-the-processing-of-personal-data",
                        "Я согласен с правилами использования сайта"
                    )}
                    variant="square"
                    defaultChecked
                />
                <Button>{t("register", "Завершить регистрацию")}</Button>
            </form>
        </div>
    );
}
