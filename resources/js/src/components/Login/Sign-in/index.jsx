import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField } from "@/components/Input";
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
            <h1 className="login__title">{t("sign-in", "Вход")}</h1>
            <p className="login__prediction">
                Еще нет аккаунта?{" "}
                <Link to="?login=sign-up">{t("sign-up", "Регистрация")}</Link>
            </p>
            <form className="login__form">
                <TextField label={"Email или телефон"} />
                <TextField label={"Пароль"} type="password" />
                <Button>{t("sign-in", "Вход")}</Button>
            </form>
            <Link className="login__forgot" to="/">
                Забыли пароль?
            </Link>
        </div>
    );
}
