import React, { useState, useEffect } from "react";

import Button from "@/components/Button";
import { TextField, Checkbox } from "@/components/Input";
import Loading from "@/components/Loading";

import { history } from "@";
import useTranslate from "@/utils/useTranslate";
import compose from "@/utils/compose";
import Modal from "@/components/Modal";

import Disclaimer from "../../components/Disclaimer";
import { withApi, withLogic } from "./hoc";

import { status as REQUEST } from "@/utils/request-status";

import "./order.scss";

function Order({
    onInputChange,
    onFormSubmit,
    onOrderComplete,
    status,
    errors,
    isFormTouched,
    isAuthorized,
    isTermsAgreed,
    isSuccessModalVisible,
    userInfo,
    ...restProps
}) {
    const { t } = useTranslate();
    return (
        <div className="container">
            <div className="order">
                <h1 className="order__title">
                    {t("place-an-order", "Оформление заказа")}
                </h1>
                <form className="order__form" onSubmit={onFormSubmit}>
                    {status === REQUEST.pending && <Loading fixed />}
                    <TextField
                        name="name"
                        disabled={isAuthorized}
                        label={t("name", "Имя")}
                        readOnly
                        value={userInfo["name"] || ""}
                        placeholder="Иван"
                    />
                    <TextField
                        name="second_name"
                        disabled={isAuthorized}
                        label={t("second-name", "Фамилия")}
                        readOnly
                        value={userInfo["second_name"] || ""}
                        placeholder="Иванов"
                    />
                    <TextField
                        name="phone"
                        disabled={isAuthorized}
                        label={t("mob-number", "Телефон")}
                        readOnly
                        value={userInfo["phone"] || ""}
                        placeholder="89990000000"
                    />
                    <TextField
                        name="email"
                        disabled={isAuthorized}
                        label={"Email"}
                        readOnly
                        value={userInfo["email"] || ""}
                        placeholder="ivanov@mail.ru"
                    />
                    <TextField
                        name="comment"
                        multiline
                        onChange={onInputChange}
                        value={userInfo["comment"] || ""}
                        label={t("comment", "Примечания")}
                    />
                    <Checkbox
                        name="terms_agreed"
                        onChange={onInputChange}
                        checked={restProps["terms_agreed"]}
                        variant="square"
                        label={t(
                            "i-agree-with-the-site-rules-and-consent-to-the-processing-of-personal-data",
                            "Я согласен с правилами использования сайта"
                        )}
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
                    <Button>{t("place-an-order", "Оформление заказа")}</Button>
                </form>
                <Modal closable={false}>
                    <div className="success-modal">
                        <h1 className="success-modal__heading">
                            Заказ успешно оформлен
                        </h1>
                        <Button onClick={onOrderComplete}>
                            Продолжить покупки
                        </Button>
                    </div>
                </Modal>
                <Disclaimer />
            </div>
        </div>
    );
}

export default compose(withApi, withLogic)(Order);
