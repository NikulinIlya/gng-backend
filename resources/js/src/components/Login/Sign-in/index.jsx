import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextField } from "@/components/Input";
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
    data
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
            <h1 className="login__title">{t("sign-in", "Вход")}</h1>
            <p className="login__prediction">
                {t("don-t-have-an-account-yet", "Еще нет аккаунта?")}{" "}
                <Link to="?login=sign-up">{t("sign-up", "Регистрация")}</Link>
            </p>
            <form className="login__form" onSubmit={onFormSubmit}>
                {status === REQUEST.pending && <Loading fixed />}
                <TextField
                    name="email"
                    onChange={onInputChange}
                    value={data["email"]}
                    label={t("email", "Email")}
                />
                <TextField
                    name="password"
                    onChange={onInputChange}
                    value={data["password"]}
                    label={t("password", "Пароль")}
                    type="password"
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
                <Button>{t("sign-in", "Вход")}</Button>
            </form>
            <Link className="login__forgot" to="/?login=restore">
                {t("forgot-your-password", "Забыли пароль?")}
            </Link>
        </div>
    );
}

export default compose(withApi, withLogic)(SingIn);
